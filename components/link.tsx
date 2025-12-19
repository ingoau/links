"use client";

import { Link as LinkType } from "@/lib/types";
import { Button } from "./ui/button";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import * as links from "@/lib/links";
import { toast } from "sonner";
import { Kbd } from "./ui/kbd";

export default function LinkComponent({
  link,
  refetchAction,
}: {
  link: LinkType;
  refetchAction: () => Promise<void>;
}) {
  return (
    <div className="border flex flex-row p-2 items-center gap-2">
      <div className="flex flex-col grow h-full">
        <button
          className="hover:underline wrap-anywhere text-left"
          onClick={() =>
            toast.promise(
              navigator.clipboard.writeText(
                `${location.protocol}//${location.host}/${link.path}`,
              ),
              {
                success: "copied",
                error: "error copying",
              },
            )
          }
        >
          <h2 className="text-lg">/{link.path}</h2>
        </button>
        <Link href={link.link} target="_blank" className="hover:underline">
          <h3 className="text-sm text-neutral-400 wrap-anywhere">
            {link.link}
          </h3>
        </Link>
        <h3 className="text-sm text-neutral-400">
          {new Date(link.createdAt).toLocaleString()}
        </h3>
      </div>
      <div className="flex flex-col h-full">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <span className="sr-only">Delete</span>
              <Trash />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>delete link</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>cancel</AlertDialogCancel>
              <AlertDialogAction
                autoFocus
                onClick={async () => {
                  toast.promise(links.deleteLink(link.path), {
                    loading: "deleting...",
                    success: "deleted",
                    error: (error) => error.message,
                    finally: () => refetchAction(),
                  });
                }}
              >
                delete
                <Kbd>⏎</Kbd>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button variant="ghost" size="icon" onClick={() => console.log("Edit")}>
          <Pencil />
        </Button>
      </div>
    </div>
  );
}
