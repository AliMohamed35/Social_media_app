import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../DB";
import { NotFoundException } from "../utils";
import { verifyToken } from "../utils/jwt";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization as string;
  const payload = verifyToken(token);
  const userRepository = new UserRepository();
  const user = await userRepository.exist({_id: payload._id});
  if(!user) throw new NotFoundException("User not found!");
  // check token >> logout from all devices
  req.user = user;

  next();
};