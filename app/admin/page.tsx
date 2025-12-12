import { auth, signOut } from "@/auth";
import CreateLink from "@/components/create-link";
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
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import * as links from "@/lib/links";
import { Suspense } from "react";

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
          <LinksList />
        </div>
      </div>
    );
  } else {
    redirect("/admin/login");
  }
}
