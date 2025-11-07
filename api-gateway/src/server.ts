import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectRedis } from "./config/redis";
import { rateLimit } from "./middleware/rateLimit";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import notificationRoutes from "./routes/notification.routes";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(rateLimit);

app.get("/health", (_req, res) => res.json({ status: "ok", service: "api-gateway" }));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/notify", notificationRoutes);

app.use((_req, res) => res.status(404).json({ message: "Not Found" }));

connectRedis().then(() =>
  app.listen(PORT, () => console.log(`[API Gateway] running on port ${PORT}`))
);
