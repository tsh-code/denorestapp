import { config } from "https://deno.land/x/dotenv/mod.ts";

export const {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  JWT_KEY,
} = config();

export const DATABASE_PORT: number = parseInt(config().DATABASE_PORT, 10);
