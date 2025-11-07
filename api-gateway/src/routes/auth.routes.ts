import { Router } from "express";
import { makeProxy } from "../utils/proxy";

const router = Router();
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL!;

router.use("/", makeProxy(AUTH_SERVICE_URL));

export default router;
