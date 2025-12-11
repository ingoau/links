import { auth } from "@/auth";
import CreateLink from "@/components/create-link";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (session) {
    return (
      <div className="p-2">
        <div className="w-full max-w-xl mx-auto flex flex-col gap-2">
          <h1 className="text-xl">links</h1>
          <CreateLink />
        </div>
      </div>
    );
  } else {
    redirect("/admin/login");
  }
}
