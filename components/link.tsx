"use client";

import { Link as LinkType } from "@/lib/types";
import { Button } from "./ui/button";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";

export default function LinkComponent({ link }: { link: LinkType }) {
  return (
    <div className="border flex flex-row p-2 items-center">
      <div className="flex flex-col grow">
        <Link
          href={`/${link.path}`}
          target="_blank"
          className="hover:underline"
        >
          <h2 className="text-lg">/{link.path}</h2>
        </Link>
        <Link href={link.link} target="_blank" className="hover:underline">
          <h3 className="text-sm text-neutral-400">{link.link}</h3>
        </Link>
        <h3 className="text-sm text-neutral-400">
          {new Date(link.createdAt).toLocaleString()}
        </h3>
      </div>
      <div className="flex flex-col">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => console.log("Delete")}
        >
          <Trash />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => console.log("Edit")}>
          <Pencil />
        </Button>
      </div>
    </div>
  );
}
