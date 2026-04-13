import { Router } from "express";
import authService from "./auth.service";

const router: Router = Router();
router.post("/register", authService.register);

export default router;
