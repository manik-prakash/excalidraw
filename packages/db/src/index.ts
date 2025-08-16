import { PrismaClient } from "./generated/prisma/edge.js";

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };
// type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// eslint-disable-next-line
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClientSingleton | undefined;
// };

const prisma =  new PrismaClient();

export default prisma;