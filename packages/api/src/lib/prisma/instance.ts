import { PrismaClient } from '@prisma/client';

export class Prisma extends PrismaClient {
  private static instance: Prisma;

  private constructor() {
    super();
    this.$connect();
  }

  static getInstance(): Prisma {
    if (!Prisma.instance) {
      Prisma.instance = new Prisma();
    }
    return Prisma.instance;
  }

  async disconnect(): Promise<void> {
    await this.$disconnect();
  }
}

export const DEPRECATED_prisma = Prisma.getInstance();
