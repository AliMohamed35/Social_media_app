"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
const factory_1 = require("./factory");
class AuthService {
    userRepository = new DB_1.UserRepository();
    authFactoryService = new factory_1.AuthFactoryService();
    constructor() { }
    register = async (req, res, next) => {
        // get data from request
        const registerDTO = req.body;
        // check user existence
        const userExist = await this.userRepository.exist({
            email: registerDTO.email,
        });
        if (userExist)
            throw new utils_1.ConflictException("User already exist");
        // prepare data
        const user = await this.authFactoryService.register(registerDTO); // map to entity before saving to DB
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
exports.default = new AuthService(); // single tone
