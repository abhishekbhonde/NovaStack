import { Router } from "express";
import { makeProxy } from "../utils/proxy";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();
const USER_SERVICE_URL = process.env.USER_SERVICE_URL!;

router.use("/", verifyToken, makeProxy(USER_SERVICE_URL));

export default router;
