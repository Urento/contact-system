import { PrismaClient } from "@prisma/client";

async function main() {
  const db = new PrismaClient();

  await db.user.upsert({
    where: {
      email: "Demo User",
    },
    create: {
      email: "Demo User",
      username: "demo",
      password: "kjsdfgdjksfhgbdfg",
    },
    update: {},
  });

  await db.user.upsert({
    where: {
      email: "Mike",
    },
    create: {
      email: "Mike",
      username: "mike",
      password: "dfghnfgnkhjfgh",
    },
    update: {},
  });

  await db.user.upsert({
    where: {
      email: "Valerie",
    },
    create: {
      email: "Valerie",
      username: "valerie",
      password: "dfgnjdfgjkdfgk",
    },
    update: {},
  });

  await db.user.upsert({
    where: {
      email: "Jordan",
    },
    create: {
      email: "Jordan",
      username: "jordan",
      password: "kjsdfgdjksfhgbdfg",
      posts: {
        create: [
          {
            title: "First post!",
            body: "This is my first post, I really hope you enjoy it!",
          },
          {
            title: "Another post",
            body: "Wow, I went ahead and made another post.",
          },
        ],
      },
    },
    update: {},
  });
}

main().catch(console.error);
