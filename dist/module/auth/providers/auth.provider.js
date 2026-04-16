"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authProvider = void 0;
const DB_1 = require("../../../DB");
const utils_1 = require("../../../utils");
exports.authProvider = {
    async checkOTP(verifyOTP) {
        const userRepository = new DB_1.UserRepository();
        const userExist = await userRepository.exist({
            email: verifyOTP.email,
        });
        if (!userExist)
            throw new utils_1.NotFoundException("User not found!");
        if (userExist.isVerified) {
            throw new utils_1.BadRequestException("User already verified!");
        }
        if (!userExist.otp || !userExist.otpExpiryAt) {
            throw new utils_1.BadRequestException("Invalid otp!");
        }
        if (userExist.otp != verifyOTP.otp)
            throw new utils_1.BadRequestException("Invalid otp!");
        if (userExist.otpExpiryAt.getTime() < Date.now()) {
            throw new utils_1.BadRequestException("Expired OTP!");
        }
    },
    async checkExitence(userData) {
        const userRepository = new DB_1.UserRepository();
        return await userRepository.exist({
            email: userData.email,
        });
    },
};
