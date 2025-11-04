import { createClient } from "redis";
//@ts-ignore
const client = createClient({ url: process.env.REDIS_URL });

export const connectRedis = async () => {
    try {
        await client.connect();
        console.log("Redis connected successfully");
    }
    catch (error) {
        console.error(`Redis connection error: ${(error as Error).message}`);
    }
}   
export default client;