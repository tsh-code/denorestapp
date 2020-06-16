import { Application } from "https://deno.land/x/dactyl/mod.ts";
import UserController from "./controllers/UserControllers.ts";

const app: Application = new Application({
  controllers: [UserController],
});

await app.run(8000);