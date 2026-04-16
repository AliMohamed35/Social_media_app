"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = void 0;
const enum_1 = require("../enum");
const sendSuccess = (message, res, data, statusCode = 200) => {
    res.status(statusCode).json({ message, status: enum_1.ApiResponseStatus.Success, data });
};
exports.sendSuccess = sendSuccess;
