import { redis } from "@/lib/redis";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: RouteContext<"/[link]">,
) {
  const { link } = await params;
  const linkData = await redis.get("link:" + link);
  if (!linkData) notFound();
  redirect(JSON.parse(linkData || "").link);
}
