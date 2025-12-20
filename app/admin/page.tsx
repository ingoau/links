import { auth, signOut } from "@/auth";
import LinksList from "@/components/links-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  const demoMode = process.env.DEMO_MODE === "true";

  if (session || demoMode) {
    return (
      <div className="p-2">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Button size="sm" asChild>
              <Link href="https://github.com/inglan/links/" target="_blank">
                links
              </Link>
            </Button>
            <div className="grow"></div>
            {demoMode ? (
              <Button size="sm" variant="destructive">
                Demo Mode
              </Button>
            ) : (
              session && (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="rounded-none! border">
                      <AvatarImage src={session.user?.image || ""} />
                      <AvatarFallback className="rounded-none!">
                        {session.user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      <div>{session.user?.name}</div>
                      <div className="text-xs text-neutral-400">
                        {session.user?.email}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <form
                      action={async () => {
                        "use server";
                        await signOut({
                          redirect: true,
                          redirectTo: "/admin/logged-out",
                        });
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
              )
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            <LinksList />
          </div>
        </div>
      </div>
    );
  } else {
    redirect("/admin/login");
  }
}
