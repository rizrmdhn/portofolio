/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import {
  validateToken,
  type JWTPayload,
  type SessionUser,
} from "@portofolio/auth";
import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError, z } from "zod";
import { parseAndValidateSafe } from "./utils/form-data-parser";

/**
 * Isomorphic Session getter for API requests
 * - Expo requests will have a session token in the Authorization header
 * - Next.js requests will have a session token in cookies
 */
const isomorphicGetSession = async (authHeader: string, cookieHeader = "") => {
  const cookies = cookieHeader.split(";").map((c) => c.trim());

  const rawRefreshToken =
    cookies
      .find((c) => c.startsWith("refreshToken="))
      ?.slice("refreshToken=".length) ?? null;
  const refreshToken = rawRefreshToken
    ? decodeURIComponent(rawRefreshToken)
    : null;

  if (authHeader) {
    const sessionToken = authHeader.split(" ")[1];
    if (sessionToken) {
      const { session, user } = await validateToken(sessionToken);
      return { session, user, refreshToken };
    }
  }

  const cookieToken = cookies
    .find((c) => c.startsWith("accessToken="))
    ?.slice("accessToken=".length);

  if (cookieToken) {
    const { session, user } = await validateToken(
      decodeURIComponent(cookieToken),
    );
    return { session, user, refreshToken };
  }

  return { session: null, user: null, refreshToken };
};

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (
  context: Request,
  resHeaders: Headers = new Headers(),
): Promise<{
  session: SessionUser | null | undefined;
  user: JWTPayload | null | undefined;
  hasAuthHeader: boolean;
  refreshToken: string | null;
  req: Request;
  resHeaders: Headers;
}> => {
  const authHeader = context.headers.get("Authorization") ?? "";
  const cookieHeader = context.headers.get("Cookie") ?? "";
  const hasAuthHeader = !!authHeader || cookieHeader.includes("accessToken=");

  const { session, user, refreshToken } = await isomorphicGetSession(
    authHeader,
    cookieHeader,
  );

  return {
    session,
    user,
    hasAuthHeader,
    refreshToken,
    req: context,
    resHeaders,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  sse: {
    ping: { enabled: true, intervalMs: 10_000 },
    client: { reconnectAfterInactivityMs: 30_000 },
  },
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? z.treeifyError(error.cause) : null,
      },
    };
  },
});

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Middleware for timing procedure execution and adding an artificial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  const duration = end - start;

  if (t._config.isDev) {
    console.log(`[TRPC] ${path} took ${duration}ms to execute`);
  }

  return result;
});

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure.use(timingMiddleware);

/**
 * Authenticated procedure
 *
 * This is the same as `publicProcedure`, but it requires the user to be logged in. If the user is
 * not logged in, this procedure will throw an error.
 */
/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(({ ctx, next }) => {
    if (!ctx.user || !ctx.session) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Anda harus masuk untuk mengakses sumber daya ini.",
      });
    }

    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
        session: ctx.session,
      },
    });
  });

/**
 * Custom tRPC procedure that accepts FormData
 * Use this instead of .input() for FormData endpoints
 */
export const formDataProcedure = <T extends z.ZodTypeAny>(schema: T) =>
  t.middleware(async (opts) => {
    const { getRawInput, next } = opts;
    const rawInput = await getRawInput();

    if (!(rawInput instanceof FormData)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Expected FormData input",
      });
    }

    const parsed = parseAndValidateSafe(rawInput as FormData, schema);

    if (!parsed.success) {
      // Format Zod errors into user-friendly messages
      const errors = parsed.error.issues.map((err) => {
        const field = err.path.join(".");
        return field ? `${field}: ${err.message}` : err.message;
      });

      throw new TRPCError({
        code: "BAD_REQUEST",
        message: errors.join(", "),
        cause: parsed.error,
      });
    }

    return next({
      ctx: {
        input: parsed,
      },
    });
  });

/**
 * FormData input schema for tRPC procedures
 * This allows tRPC to properly type mutations that accept FormData
 */
export const formDataInput = z.custom<FormData>(
  (val) => val instanceof FormData,
  { message: "Expected FormData input" },
);
