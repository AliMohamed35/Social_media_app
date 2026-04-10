import express, { Express } from "express";
import { bootstrap } from "./app.controller";
import { config } from "dotenv";

config({path:"./config/dev.env"})

const app: Express = express();
const port: number = 3000;

bootstrap(app, express);

app.listen(port, () => {
  console.log("Server is running on port", port);
});
