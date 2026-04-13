"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = require("../../DB/model/user/user.repository");
const error_1 = require("../../utils/error");
class AuthService {
    userRepository = new user_repository_1.UserRepository();
    constructor() { }
    async register(req, res, next) {
        // get data from request
        const registerDTO = req.body;
        // check user existence
        const userExist = await this.userRepository.exist({ email: registerDTO.email });
        if (userExist)
            throw new error_1.ConflictException("User already exist");
        // create user
        const createdUser = await this.userRepository.create(registerDTO);
        // send response
        return res.status(201).json({ message: "User created successfully", success: true, data: createdUser });
    }
}
exports.default = new AuthService(); // single tone
