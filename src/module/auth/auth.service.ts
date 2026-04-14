import type { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../DB";
import { ConflictException } from "../../utils";
import { RegisterDTO } from "./auth.dto";
import { AuthFactoryService } from "./factory";

class AuthService {
  private userRepository: UserRepository = new UserRepository();
  private authFactoryService: AuthFactoryService = new AuthFactoryService();

  constructor() {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    // get data from request
    const registerDTO: RegisterDTO = req.body;

    // check user existence
    const userExist = await this.userRepository.exist({
      email: registerDTO.email,
    });
    if (userExist) throw new ConflictException("User already exist");

    // prepare data
    const user = this.authFactoryService.register(registerDTO); // map to entity before saving to DB

    // create user
    const createdUser = await this.userRepository.create(user);

    // send response
    return res.status(201).json({
      message: "User created successfully",
      success: true,
      data: createdUser,
    });
  };
}

export default new AuthService(); // single tone
