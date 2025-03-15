import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
};

const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
    PORT: z.string().default('5000'),
  })
  .required();

export const envParsed = envSchema.parse(env);
