import { UserRepository } from "../../DB";
import {
  BadRequestException,
  compareHash,
  ConflictException,
  NotFoundException,
  VerificationFailedException,
} from "../../utils";
import { generateToken } from "../../utils/jwt";
import { LoginDTO, RegisterDTO, VerifyOTP } from "./auth.dto";
import { AuthFactoryService } from "./factory";
import { authProvider } from "./providers/auth.provider";

class AuthService {
  private userRepository: UserRepository = new UserRepository();
  private authFactoryService: AuthFactoryService = new AuthFactoryService();

  constructor() {}

  register = async (registerDTO: RegisterDTO) => {
    // check user existence
    const userExist = await authProvider.checkExitence(registerDTO);
    if (userExist) throw new ConflictException("User already exist");

    // prepare data
    const user = await this.authFactoryService.register(registerDTO); // map to entity before saving to DB

    // create user
    const createdUser = await this.userRepository.create(user);

    return createdUser;
  };

  verifyOTP = async (verifyOTP: VerifyOTP) => {
    // check user existence
    await authProvider.checkOTP(verifyOTP);

    return await this.userRepository.update(
      { email: verifyOTP.email },
      { isVerified: true, $unset: { otp: "", otpExpiryAt: "" } },
    );
  };

  login = async (loginDTO: LoginDTO) => {
    //check user existence
    const userExist = await authProvider.checkExitence(loginDTO);
    if (!userExist)
      throw new NotFoundException("User doesn't exits, please register first!");

    // check password
    if (!userExist.isVerified)
      throw new VerificationFailedException(
        "Please verify your account first!",
      );

    if (!(await compareHash(loginDTO.password, userExist.password)))
      throw new BadRequestException("Invalid email or password!");

    // generate token
    const accessToken = generateToken({
      payload: { _id: userExist._id, role: userExist.role },
      options: { expiresIn: "1d" },
    });

    const loggedUser = await userExist.updateOne({ isActive: true });
    return { accessToken, loggedUser };
  };
}

export default new AuthService(); // single tone
