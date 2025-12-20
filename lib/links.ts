"use server";

import { auth } from "@/auth";
import { redis } from "./redis";

const demoMode = process.env.DEMO_MODE === "true";

export async function create(
  link: string,
  path: string,
): Promise<{ success: boolean; error?: string }> {
  if (!demoMode) {
    const session = await auth();
    if (!session) return { success: false, error: "unauthorized" };
  }
  if (path == "") {
    path = Math.random().toString(36).substring(2, 8);
  }
  path = encodeURIComponent(path);

  const existing = await redis.get(`link:${path}`);
  if (existing) return { success: false, error: "path already exists" };
  await redis.set(
    `link:${path}`,
    JSON.stringify({ link, createdAt: Date.now() }),
  );
  return { success: true };
}

export async function list(): Promise<
  | { success: true; data: { path: string; link: string; createdAt: number }[] }
  | { success: false; error: string }
> {
  if (!demoMode) {
    const session = await auth();
    if (!session) return { success: false, error: "unauthorized" };
  }
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
  return {
    success: true,
    data: links.sort((a, b) => a.createdAt - b.createdAt).reverse(),
  };
}

export async function deleteLink(
  path: string,
): Promise<{ success: boolean; error?: string }> {
  if (!demoMode) {
    const session = await auth();
    if (!session) return { success: false, error: "unauthorized" };
  }
  const existing = await redis.get(`link:${path}`);
  if (!existing) return { success: false, error: "link does not exist" };
  await redis.del(`link:${path}`);
  return { success: true };
}

export async function update(
  currentPath: string,
  path: string,
  link: string,
): Promise<{ success: boolean; error?: string }> {
  if (!demoMode) {
    const session = await auth();
    if (!session) return { success: false, error: "unauthorized" };
  }
  const existing = await redis.get(`link:${currentPath}`);
  if (!existing) return { success: false, error: "link does not exist" };
  await redis.del(`link:${currentPath}`);
  const newExisting = await redis.get(`link:${path}`);
  if (newExisting) return { success: false, error: "path already exists" };
  await redis.set(
    `link:${path}`,
    JSON.stringify({ link, createdAt: JSON.parse(existing).createdAt }),
  );
  return { success: true };
}
