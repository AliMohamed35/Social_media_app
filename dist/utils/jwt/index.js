"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const generateToken = ({ payload, secretKey = config_1.devConfig.JWT_SECRET, // default value
options, }) => {
    return jsonwebtoken_1.default.sign(payload, secretKey, options);
};
exports.generateToken = generateToken;
const verifyToken = (token, secretKey = config_1.devConfig.JWT_SECRET) => {
    return jsonwebtoken_1.default.verify(token, secretKey);
};
exports.verifyToken = verifyToken;
// refresh token mechanism 
// secret for user and secret for admin if exist
