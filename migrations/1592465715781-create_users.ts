import { Migration } from "https://deno.land/x/nessie/mod.ts";

export const up: Migration = () => {
  return `CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
    password VARCHAR (60) NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL
  );`;
};

export const down: Migration = () => {
  return "DROP TABLE users";
};
