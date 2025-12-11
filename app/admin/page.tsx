import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (session) {
    return (
      <div className="p-2">
        <div className="w-full max-w-xl mx-auto">
          <div className="w-full p-2 border-b">
            <h1 className="text-xl">links</h1>
          </div>
        </div>
      </div>
    );
  } else {
    redirect("/admin/login");
  }
}
