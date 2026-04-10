"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const auth_controller_1 = __importDefault(require("./module/auth/auth.controller"));
const connection_1 = require("./DB/connection");
function bootstrap(app, express) {
    // parsing body
    app.use(express.json());
    app.use("/auth", auth_controller_1.default);
    // Fallback router for not found routes
    app.use("/{*dummy}", (req, res, next) => {
        return res.status(201).json({ message: "Invalid Router", success: false });
    });
    (0, connection_1.connectDB)();
}
