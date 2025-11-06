import { Queue } from "bullmq";
import { createClient } from "redis";

//@ts-ignore
const connection = createClient({ url: process.env.REDIS_URL });
connection.connect().catch(err => {
  console.error("Redis connection error:", err);
});


export const emailQueue = new Queue("emailQueue", {
    //@ts-ignore
  connection,
});
