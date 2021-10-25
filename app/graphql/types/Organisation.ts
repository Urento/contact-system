import { objectType } from "nexus";
import { Forms } from "./Forms";

export const Organisation = objectType({
  name: "Organisation",
  definition(t) {
    t.int("id");
    t.int("createdAt");
    t.int("updatedAt");
    t.int("ownerId");
    t.string("name");
    t.list.field("forms", {
      type: Forms,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.organisation
          .findUnique({
            where: {
              id: parent.id!,
            },
          })
          .Forms();
      },
    });
  },
});
