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
import { createUserJWToken } from "../jwt/jwt.ts";
import userRepository from "../repositories/UserRepository.ts";

@Controller("/users")
export default class User {
  @Get("/")
  @HttpStatus(200)
  async getUsers() {
    const users = await userRepository.findAll();
    return users;
  }

  @Post("/login")
  @HttpStatus(200)
  async login(
    @Body("email") email: string,
    @Body("password") password: string,
  ) {
    const user = await userRepository.findUserByEmail(email);
    if (user !== null) {
      const comparePasswords = await bcrypt.compare(
        password,
        user.password,
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
    const errors = await validate({ email, password }, userScheme);
    if (errors.length > 0) {
      throw new BadRequestException(errors.map((i) => i.message).join(", "));
    }
    const passwordHash = await bcrypt.hash(password);

    try {
      await userRepository.add(email, passwordHash);
      return {};
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
