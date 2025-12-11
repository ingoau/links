import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const session = await auth();

  if (!session) {
    await signIn("github");
  }

  redirect("/admin");
}
