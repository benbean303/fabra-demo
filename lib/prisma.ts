import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// Store the prisma connection so we aren't creating a new one for every api request
const prisma = global.prisma || new PrismaClient();

// In development, attach the PrismaClient instance to the global object
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;