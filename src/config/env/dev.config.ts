import { config } from "dotenv";

config();
export const devConfig = {
  PORT: process.env.PORT,

  DB_URL: process.env.DB_URL,

  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
};
