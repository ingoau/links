import { auth, signOut } from "@/auth";
import CreateLink from "@/components/create-link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (session) {
    return (
      <div className="p-2">
        <div className="w-full max-w-xl mx-auto flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Button size="sm" asChild>
              <Link href="https://github.com/inglan/links/" target="_blank">
                links
              </Link>
            </Button>
            <div className="grow"></div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src={session.user?.image || ""}
                  alt={session.user?.name || ""}
                  width={32}
                  height={32}
                  className="border"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirect: true, redirectTo: "/" });
                  }}
                >
                  <DropdownMenuItem asChild>
                    <button type="submit" className="w-full">
                      logout
                    </button>
                  </DropdownMenuItem>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CreateLink />
        </div>
      </div>
    );
  } else {
    redirect("/admin/login");
  }
}
