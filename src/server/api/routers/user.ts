import { string, z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getSearch: publicProcedure
    .input(
      z.object({
        text: string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.user.findMany({
        where: {
          name: {
            contains: input.text,
            mode: "insensitive",
          },
        },
        select: {
          name: true,
          image: true,
          id: true,
        },
      });
    }),
});
