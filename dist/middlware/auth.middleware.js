"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const DB_1 = require("../DB");
const utils_1 = require("../utils");
const jwt_1 = require("../utils/jwt");
const isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization;
    const payload = (0, jwt_1.verifyToken)(token);
    const userRepository = new DB_1.UserRepository();
    const user = await userRepository.exist({ _id: payload._id });
    if (!user)
        throw new utils_1.NotFoundException("User not found!");
    // check token >> logout from all devices
    req.user = user;
    next();
};
exports.isAuthenticated = isAuthenticated;
