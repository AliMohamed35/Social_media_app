"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
const factory_1 = require("./factory");
const auth_provider_1 = require("./providers/auth.provider");
class AuthService {
    userRepository = new DB_1.UserRepository();
    authFactoryService = new factory_1.AuthFactoryService();
    constructor() { }
    register = async (registerDTO) => {
        // check user existence
        const userExist = await auth_provider_1.authProvider.checkExitence(registerDTO);
        if (userExist)
            throw new utils_1.ConflictException("User already exist");
        // prepare data
        const user = await this.authFactoryService.register(registerDTO); // map to entity before saving to DB
        // create user
        const createdUser = await this.userRepository.create(user);
        return createdUser;
    };
    verifyOTP = async (verifyOTP) => {
        // check user existence
        await auth_provider_1.authProvider.checkOTP(verifyOTP);
        return await this.userRepository.update({ email: verifyOTP.email }, { isVerified: true, $unset: { otp: "", otpExpiryAt: "" } });
    };
}
exports.default = new AuthService(); // single tone
