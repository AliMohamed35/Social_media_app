import { UserRepository } from "../../DB";
import { ConflictException } from "../../utils";
import { RegisterDTO, VerifyOTP } from "./auth.dto";
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
}

export default new AuthService(); // single tone
