"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../DB/model/user/user.model");
const error_1 = require("../../utils/error");
class AuthService {
    constructor() { }
    async register(req, res, next) {
        // get data from request
        const registerDTO = req.body;
        const userExist = await user_model_1.User.findOne({ email: registerDTO.email });
        if (userExist)
            throw new error_1.ConflictException("User already exist");
        return res.status(404).json({
            message: "user created successfully",
            success: true,
            data: req.body,
        });
    }
}
exports.default = new AuthService(); // single tone
