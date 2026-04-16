import { Router } from "express";
import { isValid } from "../../middlware";
import authController from "./auth.controller";
import * as authValidation from "./auth.validation";
import { isAuthenticated } from "../../middlware/auth.middleware";

const router: Router = Router();
router.post(
  "/register",
  isValid(authValidation.registerSchema),
  authController.register,
);

router.post("/verify", authController.verifyOTP);

router.post(
  "/login",
  isValid(authValidation.loginSchema),
  authController.login,
);

export default router;
