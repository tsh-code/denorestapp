import pgClient from "./pg.ts";

export default {
  findUserByEmail: async (email: string) => {
    const result = await pgClient.query(
      "SELECT email, password FROM users WHERE email = lower($1) LIMIT 1",
      email,
    );
    if (result.rowCount === 1) {
      const data = result.rowsOfObjects();
      return data[0];
    }
    return null;
  },
  findAll: async () => {
    const result = await pgClient.query("SELECT id, email FROM users;");
    return result.rowsOfObjects();
  },
  add: async (email: string, password: string) => {
    await pgClient.query(
      "INSERT INTO users (email, password) VALUES (lower($1), $2);",
      email,
      password,
    );
  },
};
