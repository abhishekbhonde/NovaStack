import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { AUTH_SERVICE_URL } from "../config/serviceUrl.js";

export const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing or invalid Authorization header" });
    }

    const token = auth.slice("Bearer ".length);
    const response = await axios.post(`${AUTH_SERVICE_URL}/auth/validate`, { token });

    if (response.data?.data?.valid || response.data?.data?.user) {
        // @ts-ignore
      req.user = response.data.data.user;
      next();
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
