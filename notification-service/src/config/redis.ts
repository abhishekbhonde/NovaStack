import { createClient } from "redis";

//@ts-ignore
const client = createClient({ url: process.env.REDIS_URL });
client.on("error", (err) => console.error("[Redis Error]", err));

export const connectRedis = async () => {
  if (!client.isOpen) await client.connect();
  console.log("[Redis] Connected");
};

export default client;
