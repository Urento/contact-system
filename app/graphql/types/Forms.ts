import { objectType } from "nexus";
import { Organisation } from ".";

export const Forms = objectType({
  name: "Forms",
  definition(t) {
    t.int("id");
    t.int("createdAt");
    t.int("updatedAt");
    t.field("organisation", { type: Organisation });
    t.int("organisationId");
  },
});
