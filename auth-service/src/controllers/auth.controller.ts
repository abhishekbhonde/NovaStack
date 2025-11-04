import type  { Request, Response } from "express";
import { User } from "../models/user.model";

import { comparePassword, hashPassword } from "../utils/hash";
import { signToken, verifyToken } from "../config/jwt";
import { publishEvent } from "../events/publisher";
import { success, fail } from "../utils/response";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return fail(res, "User already exists", 409);

    const hashed = await hashPassword(password);
    const user = await User.create({ name, email, password: hashed });

    const token = signToken({ id: user._id, email: user.email });

    // Publish event to notification service
    await publishEvent("user_events", { type: "REGISTERED", email: user.email });

    return success(res, { token, user }, 201);
  } catch (err) {
    console.error(err);
    fail(res, "Server Error", 500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return fail(res, "Invalid credentials", 401);

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return fail(res, "Invalid credentials", 401);

    const token = signToken({ id: user._id, email: user.email });
    success(res, { token, user });
  } catch (err) {
    console.error(err);
    fail(res, "Server Error", 500);
  }
};

export const validate = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const decoded = verifyToken(token);
    success(res, { valid: true, user: decoded });
  } catch {
    fail(res, "Invalid or expired token", 401);
  }
};