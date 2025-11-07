import type { Request, Response, NextFunction } from "express";
import redis from "../config/redis";

const windowSec = Number(process.env.RATE_LIMIT_WINDOW_SEC || 60);
const maxReq = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 100);

export async function rateLimit(req: Request, res: Response, next: NextFunction) {
  try {
    const ip = req.ip;
    const key = `ratelimit:${ip}:${Math.floor(Date.now() / (windowSec * 1000))}`;

    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, windowSec);

    if (count > maxReq) {
      return res.status(429).json({ message: "Too many requests. Try again later." });
    }

    next();
  } catch (e) {
    console.error("[RateLimit Error]", e);
    next(); // fail open
  }
}
