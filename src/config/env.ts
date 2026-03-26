import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  TELEGRAM_BOT_TOKEN: z.string().min(1, 'TELEGRAM_BOT_TOKEN is required'),
  TELEGRAM_ALLOWED_USER_IDS: z.string().transform((val: string): number[] => {
    return val.split(',').map((id: string) => parseInt(id.trim(), 10)).filter(Boolean);
  }),
  GROQ_API_KEY: z.string().min(1, 'GROQ_API_KEY is required'),
  OPENROUTER_API_KEY: z.string().min(1, 'OPENROUTER_API_KEY is required'),
  OPENROUTER_MODEL: z.string().default('meta-llama/llama-3.1-8b-instruct:free'),
  DATABASE_PATH: z.string().default('./data/messages.db'),
  DEEPGRAM_API_KEY: z.string().min(1, 'DEEPGRAM_API_KEY is required'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Environment validation failed:');
  parsed.error.errors.forEach((err: { path: (string | number)[]; message: string }) => {
    console.error(`  - ${err.path.join('.')}: ${err.message}`);
  });
  process.exit(1);
}

export const env = parsed.data;
