import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const offerRouter = createTRPCRouter({
  getFiltered: publicProcedure
    .input(
      z.object({
        name: z.string(),
        genre: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      console.log(input);
      return ctx.db.offer.findMany({
        where: {
          name: {
            contains: input.name,
            mode: "insensitive",
          },
          genre: {
            contains: input.genre,
          },
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        genre: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const item = await ctx.db.offer.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      });
      return item;
    }),
});
