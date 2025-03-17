import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

/**
 * In serverless environments, we need to ensure that only one PrismaClient instance
 * is created per container to avoid exhausting database connections. This is achieved by storing the
 * PrismaClient instance in a global variable, which persists across invocations in the same warm container.
 */
export const prisma = globalForPrisma.prisma || new PrismaClient();

/**
 * In development mode, this setup also ensures that the PrismaClient instance persists across hot reloads,
 * preventing unnecessary reinitializations that can lead to connection issues or slowdowns.
 */
if (process.env.NODE_ENV === 'development') globalForPrisma.prisma = prisma;
