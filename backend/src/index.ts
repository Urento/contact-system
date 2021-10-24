import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const main = async () => {
  dotenv.config();
};

main().finally(async () => {
  await prisma.$disconnect();
});
