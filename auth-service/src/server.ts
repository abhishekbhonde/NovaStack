import "dotenv/config"
import express from "express";
import cors from "cors";
import { success } from "./utils/response";
import authRouter from "./routes/auth.routes"
import { connectDB } from "./config/db";
import { connectRedis } from "./config/redis";
const app = express();
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 4001;
app.get("/health", (_req,res)=>{
    success(res, "Health endpoint", 200);
})

app.use("/auth", authRouter)


connectDB().then(connectRedis).then(()=>{
    app.listen(PORT, ()=>console.log(`[Auth Service] running on port ${PORT}`));
})
.catch((err)=>{
    console.error("Startup failed", err);
})