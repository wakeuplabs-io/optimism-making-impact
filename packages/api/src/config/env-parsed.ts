import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  DB_URL_NON_POOLING: process.env.DB_URL_NON_POOLING,
};

const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
    PORT: z.string().default('5000'),
    DB_URL: z.string().url(),
    DB_URL_NON_POOLING: z.string().url(),
  })
  .required();

export const envParsed = envSchema.parse(env);
