import redis from "../config/redis";

export const publishEvent = async (channel: string, payload: any) => {
  await redis.publish(channel, JSON.stringify(payload));
  console.log(`[Redis Pub] ${channel} ->`, payload);
};
