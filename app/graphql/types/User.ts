import { objectType } from "nexus";
import { Organisation } from "./Organisation";

export const User = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.int("createdAt");
    t.int("updatedAt");
    t.string("email");
    t.string("password");
    t.string("username");
    t.list.field("organisation", {
      type: Organisation,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              email: parent.email!,
              id: parent.id!,
            },
          })
          .organisation();
      },
    });
  },
});
