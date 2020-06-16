import { Client } from "https://deno.land/x/postgres/mod.ts";
import { DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT } from "./config.ts";

const pgClient = new Client({
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  hostname: DATABASE_HOST,
  port: DATABASE_PORT
});

await pgClient.connect();

export default pgClient;
