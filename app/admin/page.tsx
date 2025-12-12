import { auth, signOut } from "@/auth";
import CreateLink from "@/components/create-link";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (session) {
    return (
      <div className="p-2">
        <div className="w-full max-w-xl mx-auto flex flex-col gap-2">
          <div className="flex flex-row">
            <h1 className="text-xl">links</h1>
            <div className="grow"></div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirect: true, redirectTo: "/" });
              }}
            >
              <Button variant="outline" size="sm" type="submit">
                logout
              </Button>
            </form>
          </div>
          <CreateLink />
        </div>
      </div>
    );
  } else {
    redirect("/admin/login");
  }
}
