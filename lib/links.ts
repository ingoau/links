"use server";

import { redis } from "./redis";

export async function create(link: string, path: string) {
  await redis.set(
    `link:${path}`,
    JSON.stringify({ link, createdAt: Date.now() }),
  );
}
