"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = require("../../DB/model/user/user.repository");
const error_1 = require("../../utils/error");
const auth_factory_service_1 = require("./factory/auth.factory.service");
const authValidation = __importStar(require("./auth.validation"));
class AuthService {
    userRepository = new user_repository_1.UserRepository();
    authFactoryService = new auth_factory_service_1.AuthFactoryService();
    constructor() { }
    register = async (req, res, next) => {
        // get data from request
        const registerDTO = req.body;
        // validate schema against body
        const result = authValidation.registerSchema.safeParse(registerDTO);
        if (result.success == false) {
            let errorMessages = result.error.issues.map((issue) => ({
                path: issue.path[0],
                message: issue.message,
            }));
            throw new error_1.BadRequestException("Validation error!", errorMessages);
        }
        // check user existence
        const userExist = await this.userRepository.exist({
            email: registerDTO.email,
        });
        if (userExist)
            throw new error_1.ConflictException("User already exist");
        // prepare data
        const user = this.authFactoryService.register(registerDTO); // map to entity before saving to DB
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
