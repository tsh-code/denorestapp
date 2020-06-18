import { ClientPostgreSQL } from "https://deno.land/x/nessie/clients/ClientPostgreSQL.ts";
import { DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT } from "./config.ts";

const nessieOptions = {
  migrationFolder: "./migrations"
};

const connectionOptions = {
  database: DATABASE_NAME,
  hostname: DATABASE_HOST,
  port: DATABASE_PORT,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
};


export default {
  client: new ClientPostgreSQL(nessieOptions, connectionOptions),
  exposeQueryBuilder: false,
};
