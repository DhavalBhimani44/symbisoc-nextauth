import { PrismaClient } from "@prisma/client";

const globalThisWithPrisma: { prisma?: PrismaClient } & typeof globalThis = globalThis;

const client = globalThisWithPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV === "production") {
  globalThisWithPrisma.prisma = client;
}

export default client;