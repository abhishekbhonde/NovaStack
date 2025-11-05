import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import { connectRedis } from "./config/redis.js";
import router from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ status: "ok", service: "user-service" }));
app.use("/users", router);


connectDB()
  .then(connectRedis)
  .then(() => {
    app.listen(PORT, () => console.log(`[User Service] running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Startup failed:", err);
    process.exit(1);
  });
