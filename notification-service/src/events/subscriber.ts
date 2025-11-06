import redis from "../config/redis.js";
import { emailQueue } from "../jobs/emailQueue.js";

export const subscribeToEvents = async () => {
  const subscriber = redis.duplicate();
  await subscriber.connect();

  await subscriber.subscribe("user_events", async (message) => {
    const event = JSON.parse(message);
    console.log(`[Event Received] ${event.type}`);

    if (event.type === "REGISTERED") {
      // Queue the welcome email job
      await emailQueue.add("sendWelcomeEmail", { email: event.email });
    }
  });

  console.log("[Subscriber] Listening to user_events...");
};
