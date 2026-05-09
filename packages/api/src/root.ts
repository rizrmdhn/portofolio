import { createCallerFactory, createTRPCRouter } from ".";
import { certificationRouter } from "./routers/certification";
import { experienceRouter } from "./routers/experience";
import { profileRouter } from "./routers/profile";
import { projectRouter } from "./routers/project";
import { socialLinkRouter } from "./routers/social-link";
import { techStackRouter } from "./routers/tech-stack";

export const appRouter = createTRPCRouter({
  project: projectRouter,
  experience: experienceRouter,
  certification: certificationRouter,
  techStack: techStackRouter,
  profile: profileRouter,
  socialLink: socialLinkRouter,
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
