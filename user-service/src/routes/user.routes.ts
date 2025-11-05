import { Router } from "express";
import { authGuard } from "../middelware/authGuard.js";
import { getProfile, upsertProfile, deleteProfile } from "../controllers/user.controller.js";

const router = Router();

router.get("/me", authGuard, getProfile);
router.post("/me", authGuard, upsertProfile);
router.delete("/me", authGuard, deleteProfile);

export default router;
