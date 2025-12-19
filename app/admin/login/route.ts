import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export async function GET() {
  const session = await auth();

  if (!session) {
    await signIn("github", { redirectTo: "/admin" });
  }

  redirect("/admin");
}
