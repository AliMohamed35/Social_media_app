import type { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../DB/model/user/user.repository";
import { BadRequestException, ConflictException } from "../../utils/error";
import { RegisterDTO } from "./auth.dto";
import { AuthFactoryService } from "./factory/auth.factory.service";
import * as authValidation from "./auth.validation";

class AuthService {
  private userRepository: UserRepository = new UserRepository();
  private authFactoryService: AuthFactoryService = new AuthFactoryService();

  constructor() {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    // get data from request
    const registerDTO: RegisterDTO = req.body;

    // validate schema against body
    const result = authValidation.registerSchema.safeParse(registerDTO);

    if (result.success == false) {
      let errorMessages = result.error.issues.map((issue) => ({
        path: issue.path[0] as string,
        message: issue.message,
      }));

      throw new BadRequestException("Validation error!", errorMessages);
    }

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
