import { Request, Response, NextFunction } from "express";
import { LoginDTO, RegisterDTO, VerifyOTP } from "./auth.dto";
import authService from "./auth.service";
import { sendSuccess } from "../../utils";

class UserController {
  private authService = authService;
  constructor() {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registerDTO: RegisterDTO = req.body;
      const createdUser = await this.authService.register(registerDTO);

      return sendSuccess("User created successfully!", res, createdUser, 201);
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

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get data from request
      const loginDTO: LoginDTO = req.body;

      const { accessToken, loggedUser } = await this.authService.login(loginDTO);

      return sendSuccess("User logged in successfully!", res, {accessToken, loggedUser}, 200);
    } catch (error) {
      next(error);
    }
  };
}

export default new UserController();
