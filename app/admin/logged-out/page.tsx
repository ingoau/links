import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoggedOutPage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-2">
      <p className="text-xl">logged out</p>
      <Button variant="ghost" asChild>
        <Link href="/admin">log in</Link>
      </Button>
    </div>
  );
}
