import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectRedis } from "./config/redis.js";
import { subscribeToEvents } from "./events/subscriber.js";
import "./jobs/worker.js"; // start email worker

const app = express();
const PORT = process.env.PORT || 4003;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ status: "ok", service: "notification-service" }));

app.use((_req, res) => res.status(404).json({ message: "Not Found" }));

connectRedis()
  .then(subscribeToEvents)
  .then(() => {
    app.listen(PORT, () => console.log(`[Notification Service] running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Startup failed:", err);
    process.exit(1);
  });
