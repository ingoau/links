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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as links from "@/lib/links";
import { toast } from "sonner";
import { Kbd } from "./ui/kbd";
import { useState } from "react";
import { Input } from "./ui/input";

export default function LinkComponent({
  link,
  refetchAction,
}: {
  link: LinkType;
  refetchAction: () => Promise<void>;
}) {
  const [enteredLink, setEnteredLink] = useState("");
  const [enteredPath, setEnteredPath] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);

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
                  toast.promise(
                    new Promise((resolve, reject) => {
                      links
                        .deleteLink(link.path)
                        .then(() => refetchAction().then(resolve).catch(reject))
                        .catch(reject);
                    }),
                    {
                      loading: "deleting...",
                      success: "deleted",
                      error: (error) => error.message,
                    },
                  );
                }}
              >
                delete
                <Kbd>⏎</Kbd>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Dialog
          onOpenChange={(open) => {
            setEditDialogOpen(open);
            if (open) {
              setEnteredLink(link.link);
              setEnteredPath(link.path);
            }
          }}
          open={editDialogOpen}
        >
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Pencil />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>edit</DialogTitle>
              <form
                className="flex flex-row gap-2"
                onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  setEditDialogOpen(false);

                  toast.promise(
                    new Promise((resolve, reject) => {
                      links
                        .update(link.path, enteredPath, enteredLink)
                        .then(() => refetchAction().then(resolve).catch(reject))
                        .catch(reject);
                    }),
                    {
                      loading: "updating...",
                      success: "link updated",
                      error: (error) => error,
                    },
                  );
                }}
              >
                <Input
                  type="url"
                  placeholder="link"
                  name="link"
                  value={enteredLink}
                  onChange={(e) => setEnteredLink(e.target.value)}
                />
                <Input
                  placeholder="path"
                  name="path"
                  value={enteredPath}
                  onChange={(e) => setEnteredPath(e.target.value)}
                />
                <Button variant="outline">
                  save<Kbd>⏎</Kbd>
                </Button>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
