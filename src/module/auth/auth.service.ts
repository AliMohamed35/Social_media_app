import type { NextFunction, Request, Response } from "express";
import { RegisterDTO } from "./auth.dto";
import { User } from "../../DB/model/user/user.model";
import { ConflictException } from "../../utils/error";

class AuthService {
  constructor() {}

  async register(req: Request, res: Response, next: NextFunction) {
    // get data from request
    const registerDTO: RegisterDTO = req.body;

    const userExist = await User.findOne({ email: registerDTO.email });
    if (userExist) throw new ConflictException("User already exist");

    return res.status(404).json({
      message: "user created successfully",
      success: true,
      data: req.body,
    });
  }
}

export default new AuthService(); // single tone
