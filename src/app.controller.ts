import { NextFunction, Request, Response, type Express } from "express";
import authRouter from "./module/auth/auth.controller";
import { connectDB } from "./DB/connection";
import { AppError } from "./utils/error";

export function bootstrap(app: Express, express: any) {
  // operation buffering
  connectDB();

  // parsing body
  app.use(express.json());

  app.use("/auth", authRouter);

  // Fallback router for not found routes
  app.use("/{*dummy}", (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({ message: "Invalid Router", success: false });
  });

  app.use(
    (error: AppError, req: Request, res: Response, next: NextFunction) => {
      return res
        .status(error.statusCode)
        .json({ message: error.message, success: false, errorDetails: error.errorDetails });
    },
  );
}
