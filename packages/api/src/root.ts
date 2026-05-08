import { createCallerFactory, createTRPCRouter } from ".";
import { certificationRouter } from "./routers/certification";
import { experienceRouter } from "./routers/experience";
import { projectRouter } from "./routers/project";
import { techStackRouter } from "./routers/tech-stack";

export const appRouter = createTRPCRouter({
  project: projectRouter,
  experience: experienceRouter,
  certification: certificationRouter,
  techStack: techStackRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
