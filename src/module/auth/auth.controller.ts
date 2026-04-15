import { Request, Response, NextFunction } from "express";
import { RegisterDTO, VerifyOTP } from "./auth.dto";
import authService from "./auth.service";

class UserController {
  private authService = authService;
  constructor() {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registerDTO: RegisterDTO = req.body;
      const createdUser = await this.authService.register(registerDTO);

      return res.status(201).json({
        message: "User created successfully",
        success: true,
        data: createdUser,
      });
    } catch (error) {
      next(error);
    }
  };
  
  verifyOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const verifyOTP: VerifyOTP = req.body;
      await this.authService.verifyOTP(verifyOTP);

      return res.sendStatus(204); // usually used to refer to no content, sendStatus used also to end the request.
    } catch (error) {
      next(error);
    }
  };
}

export default new UserController();
