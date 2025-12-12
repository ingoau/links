"use server";

import { redis } from "./redis";

export async function create(link: string, path: string) {
  const existing = await redis.get(`link:${path}`);
  if (existing) throw new Error("Link already exists");
  await redis.set(
    `link:${path}`,
    JSON.stringify({ link, createdAt: Date.now() }),
  );
}

export async function list() {
  const keys = await redis.keys("link:*");
  const links = await Promise.all(
    keys.map(async (key) => {
      const value = await redis.get(key);
      return {
        path: key.replace("link:", ""),
        ...(JSON.parse(value || "") as { link: string; createdAt: number }),
      };
    }),
  );
  return links.sort((a, b) => a.createdAt - b.createdAt);
}
