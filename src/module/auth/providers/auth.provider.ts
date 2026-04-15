import { UserRepository } from "../../../DB";
import { BadRequestException, NotFoundException } from "../../../utils";
import { RegisterDTO, VerifyOTP } from "../auth.dto";

export const authProvider = {
  async checkOTP(verifyOTP: VerifyOTP) {
    const userRepository = new UserRepository();

    const userExist = await userRepository.exist({
      email: verifyOTP.email,
    });

    if (!userExist) throw new NotFoundException("User not found!");

    if (userExist.isVerified) {
      throw new BadRequestException("User already verified!");
    }

    if (!userExist.otp || !userExist.otpExpiryAt) {
      throw new BadRequestException("Invalid otp!");
    }

    if (userExist.otp != verifyOTP.otp)
      throw new BadRequestException("Invalid otp!");

    if (userExist.otpExpiryAt.getTime() < Date.now()) {
      throw new BadRequestException("Expired OTP!");
    }
  },

  async checkExitence(registerDTO: RegisterDTO) {
    const userRepository = new UserRepository();

    return await userRepository.exist({
      email: registerDTO.email,
    });
  },
};
