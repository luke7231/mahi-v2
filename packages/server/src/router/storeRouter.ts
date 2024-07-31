import { prisma } from "../lib/prismaClient";
import { trpc } from "../lib/trpc";
import { input, z } from "zod";

export const storeRouter = trpc.router({
  list: trpc.procedure.query(({ ctx }) => {
    console.log(ctx.user);
    // const todos = await prisma.todo.findMany()
    // return todos
    return prisma.store.findMany();
  }),
  create: trpc.procedure
    .input(z.object({ title: z.string(), lat: z.number(), lng: z.number() }))
    .mutation(({ input }) => {
      const title = input.title;
      const lat = input.lat;
      const lng = input.lng;
      return prisma.store.create({
        data: {
          title: title,
          lat,
          lng,
        },
      });
    }),
  delete: trpc.procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      return prisma.store.delete({
        where: {
          id: input.id,
        },
      });
    }),
  update: trpc.procedure
    .input(
      z.object({
        id: z.string(),
        lat: z.number(),
        lng: z.number(),
        title: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const title = input.title;
      const lat = input.lat;
      const lng = input.lng;
      return prisma.store.update({
        where: {
          id: input.id,
        },
        data: {
          title,
          lat,
          lng,
        },
      });
    }),
});
