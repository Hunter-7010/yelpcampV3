import { createTRPCRouter } from "~/server/api/trpc";
import { campgroundRouter } from "./routers/campgrounds";
import { searchCampground } from "./routers/searchCampground";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  campground: campgroundRouter,
  searchCampground,
});

// export type definition of API
export type AppRouter = typeof appRouter;
