import { Context } from "@apollo/client";
import { prisma } from "../lib/prisma";

export const resolvers = {
  Query: {
    username: async (_parent: any, _args: any, ctx: Context) =>
      await ctx.prisma.user.findAll(),
  },
};
