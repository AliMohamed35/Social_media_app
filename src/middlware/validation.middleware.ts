import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { BadRequestException } from "../utils";

export const isValid = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // validate schema against body
    let data = { ...req.body, ...req.params, ...req.query };
    const result = schema.safeParse(data);

    if (result.success == false) {
      let errorMessages = result.error.issues.map((issue) => ({
        path: issue.path[0] as string,
        message: issue.message,
      }));

      throw new BadRequestException("Validation error!", errorMessages);
    }

    next();
  };
};
