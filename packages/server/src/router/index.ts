import { trpc } from "../lib/trpc";
import { storeRouter } from "./storeRouter";

export const appRouter = trpc.router({
  store: storeRouter,
});

export type AppRouter = typeof appRouter;
