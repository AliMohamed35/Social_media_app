import type { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../DB/model/user/user.repository";
import { User } from "../../DB/model/user/user.model";
import { ConflictException } from "../../utils/error";
import { RegisterDTO } from "./auth.dto";

class AuthService {
  private userRepository: UserRepository = new UserRepository();
  constructor() {}

  async register(req: Request, res: Response, next: NextFunction) {
    // get data from request
    const registerDTO: RegisterDTO = req.body;

    // check user existence
    const userExist = await this.userRepository.exist({email: registerDTO.email});
    if (userExist) throw new ConflictException("User already exist");
    
    // create user
    const createdUser = await this.userRepository.create(registerDTO);
    
    // send response
    return res.status(201).json({message: "User created successfully", success: true, data: createdUser});
  }
}

export default new AuthService(); // single tone
