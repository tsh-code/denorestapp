import {
  Controller,
  Body,
  Get,
  HttpStatus,
  Post,
  BadRequestException,
  InternalServerErrorException,
} from "https://deno.land/x/dactyl/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { validate } from "https://deno.land/x/valideno/mod.ts";
import { userScheme } from "../validators/UserScheme.ts";
import { createUserJWToken } from "../jwt.ts";
import pgClient from "../db.ts";

@Controller("/users")
export default class User {
  @Get("/")
  @HttpStatus(200)
  async getUsers() {
    const result = await pgClient.query("SELECT id, email FROM users;");
    return result.rowsOfObjects();
  }

  @Post("/login")
  @HttpStatus(200)
  async login(
    @Body("email") email: string,
    @Body("password") password: string,
  ) {
    const result = await pgClient.query(
      "SELECT email, password FROM users WHERE email = lower($1)",
      email,
    );
    if (result.rowCount === 1) {
      const data = result.rowsOfObjects();
      const comparePasswords = await bcrypt.compare(
        password,
        data[0]["password"],
      );
      if (comparePasswords) {
        return { token: createUserJWToken(email) };
      }
      throw new BadRequestException("Given password is incorrect.");
    }
    throw new BadRequestException("Given email does not exists.");
  }

  @Post("/register")
  @HttpStatus(201)
  async register(
    @Body("email") email: string,
    @Body("password") password: string,
  ) {
    const hash = await bcrypt.hash("test");
    console.log(hash);
    const errors = await validate({ email, password }, userScheme);

    if (errors.length > 0) {
      throw new BadRequestException(errors.map((i) => i.message).join(", "));
    }
    const passwordHash = await bcrypt.hash(password);

    try {
      await pgClient.query(
        "INSERT INTO users (email, password) VALUES (lower($1), $2);",
        email,
        passwordHash,
      );
      return {};
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
