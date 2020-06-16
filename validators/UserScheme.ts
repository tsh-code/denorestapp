import {
  isString,
  isEmail,
  isRequired,
  Validator,
  Args,
} from "https://deno.land/x/valideno/mod.ts";
import pgClient from "../db.ts";

export const isEmailExists = (): Validator => {
  return {
    type: "isEmailExists",
    check: async (value: any) => {
      const result = await pgClient.query(
        "SELECT COUNT(*) FROM users WHERE email = lower($1)",
        value,
      );
      const rows = result.rowsOfObjects();
      return (rows[0]["count"] != 0) ? {} : undefined;
    },
    message: (value: any, args?: Args) => {
      return `User with email [${value}] already exists.`;
    },
  };
};

export const userScheme = {
  email: [isEmail(), isRequired(), isEmailExists()],
  password: [isString(), isRequired()],
};
