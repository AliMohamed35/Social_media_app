import { Router } from "express";
import authController from "./auth.controller";
import { isValid } from "../../middlware";
import * as authValidation from "./auth.validation";

const router: Router = Router();
router.post(
  "/register",
  isValid(authValidation.registerSchema),
  authController.register,
);

router.post("/verify", authController.verifyOTP)

export default router;
