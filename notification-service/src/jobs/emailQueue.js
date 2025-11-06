import { Queue } from "bullmq";
import { createClient } from "redis";
//@ts-ignore
const connection = createClient({ url: process.env.REDIS_URL });
await connection.connect();
export const emailQueue = new Queue("emailQueue", {
    //@ts-ignore
    connection,
});
//# sourceMappingURL=emailQueue.js.map