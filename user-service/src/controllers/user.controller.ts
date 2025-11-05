import type { Request, Response } from "express";
import { Profile } from "../models/profile.model.js";
import redis from "../config/redis.js";
import { success, fail } from "../utils/response.js";

// GET profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = (req.user as any)?.id;
    const cacheKey = `profile:${userId}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log("[Cache Hit]");
      return success(res, JSON.parse(cached));
    }

    const profile = await Profile.findOne({ userId });
    if (!profile) return fail(res, "Profile not found", 404);

    await redis.setEx(cacheKey, 60, JSON.stringify(profile)); // cache 1 min
    success(res, profile);
  } catch (err) {
    fail(res, "Error fetching profile", 500);
  }
};

// CREATE or UPDATE
export const upsertProfile = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = (req.user as any)?.id;
    const { bio, location, website } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId },
      { bio, location, website },
      { new: true, upsert: true }
    );

    // Invalidate cache
    await redis.del(`profile:${userId}`);

    success(res, profile, 201);
  } catch (err) {
    fail(res, "Error updating profile", 500);
  }
};

// DELETE
export const deleteProfile = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = (req.user as any)?.id;
    await Profile.findOneAndDelete({ userId });
    await redis.del(`profile:${userId}`);
    success(res, { message: "Profile deleted" });
  } catch (err) {
    fail(res, "Error deleting profile", 500);
  }
};
