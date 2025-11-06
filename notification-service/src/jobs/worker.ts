import { Worker } from "bullmq";
import { createClient } from "redis";
import { sendEmail } from "../utils/sendEmail.js";

(async () => {
  //@ts-ignore
  const connection = createClient({ url: process.env.REDIS_URL });
  await connection.connect();

  const worker = new Worker(
    "emailQueue",
    async (job) => {
      const { email } = job.data;
      console.log(`[Worker] Sending welcome email to ${email}`);
      await sendEmail(email, "Welcome to NovaStack 🚀", "We’re excited to have you onboard!");
    },
    //@ts-ignore
    { connection }
  );

  worker.on("completed", (job) => console.log(`[Worker] Job completed: ${job.id}`));
  worker.on("failed", (job, err) => console.error(`[Worker] Job failed: ${job?.id}`, err));
})();
