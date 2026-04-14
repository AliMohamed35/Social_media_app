import { Router } from "express";
import userService from "./user.service";

export const router = Router();

router.get("/:id", userService.getProfile);

export default router;