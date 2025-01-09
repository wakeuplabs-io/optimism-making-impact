import { z } from "zod";

const env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
  POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
};

const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
    PORT: z.string().default('5000'),
    POSTGRES_PRISMA_URL: z.string().url(),
    POSTGRES_URL_NON_POOLING: z.string().url(),
  })
  .required();

export const envParsed = envSchema.parse(env);
