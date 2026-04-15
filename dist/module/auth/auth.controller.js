"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("./auth.service"));
class UserController {
    authService = auth_service_1.default;
    constructor() { }
    register = async (req, res, next) => {
        try {
            const registerDTO = req.body;
            const createdUser = await this.authService.register(registerDTO);
            return res.status(201).json({
                message: "User created successfully",
                success: true,
                data: createdUser,
            });
        }
        catch (error) {
            next(error);
        }
    };
    verifyOTP = async (req, res, next) => {
        try {
            const verifyOTP = req.body;
            await this.authService.verifyOTP(verifyOTP);
            return res.sendStatus(204); // usually used to refer to no content, sendStatus used also to end the request.
        }
        catch (error) {
            next(error);
        }
    };
}
exports.default = new UserController();
