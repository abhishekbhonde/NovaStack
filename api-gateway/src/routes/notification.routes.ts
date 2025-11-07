import { Router } from "express";
import { makeProxy } from "../utils/proxy";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL!;

router.use("/", verifyToken, makeProxy(NOTIFICATION_SERVICE_URL));

export default router;
