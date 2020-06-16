import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts";
import { JWT_KEY } from "./config.ts";

export function createUserJWToken(email: string) {
  const payload = {
    iss: email,
    exp: setExpiration(new Date().getTime() + 3600),
  } as Payload;
  const header: Jose = {
    alg: "HS256",
    typ: "JWT",
  };
  return makeJwt({ header, payload, key: JWT_KEY });
}
