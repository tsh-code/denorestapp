import {
  isString,
  isEmail,
  isRequired,
  Validator,
  Args,
} from "https://deno.land/x/valideno/mod.ts";
import userRepository from "../repositories/UserRepository.ts";

export const emailExists = (): Validator => {
  return {
    type: "emailExists",
    check: async (value: any) => {
      const user = await userRepository.findUserByEmail(value);
      return (user === null) ? undefined : {};
    },
    message: (value: any, args?: Args) => {
      return `User with email [${value}] already exists.`;
    },
  };
};

export const userScheme = {
  email: [isEmail(), isRequired(), emailExists()],
  password: [isString(), isRequired()],
};
