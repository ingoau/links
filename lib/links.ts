"use server";

import { auth } from "@/auth";
import { redis } from "./redis";

export async function create(link: string, path: string) {
  const session = await auth();
  if (!session) throw new Error("unauthorized");
  const existing = await redis.get(`link:${path}`);
  if (existing) throw new Error("path already exists");
  await redis.set(
    `link:${path}`,
    JSON.stringify({ link, createdAt: Date.now() }),
  );
}

export async function list() {
  const session = await auth();
  if (!session) throw new Error("unauthorized");
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
  return links.sort((a, b) => a.createdAt - b.createdAt).reverse();
}
