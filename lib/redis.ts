import { createClient } from "redis";

let redisClient: ReturnType<typeof createClient> | null = null;

async function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.REDIS_URL,
    });
    await redisClient.connect();
  }
  return redisClient;
}

export const redis = {
  async get(key: string) {
    const client = await getRedisClient();
    return client.get(key);
  },
  async set(key: string, value: string) {
    const client = await getRedisClient();
    return client.set(key, value);
  },
  async del(key: string) {
    const client = await getRedisClient();
    return client.del(key);
  },
  async keys(pattern: string) {
    const client = await getRedisClient();
    return client.keys(pattern);
  },
};
