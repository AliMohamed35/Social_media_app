import { Router } from "express";
import authService from "./auth.service";
import { isValid } from "../../middlware";
import * as authValidation from "./auth.validation";

const router: Router = Router();
router.post(
  "/register",
  isValid(authValidation.registerSchema),
  authService.register,
);

export default router;
