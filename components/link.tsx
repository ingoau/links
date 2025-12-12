"use client";

import { Link } from "@/lib/types";

export default function LinkComponent({ link }: { link: Link }) {
  return (
    <div className="p-2 border">
      <h2 className="text-lg">/{link.path}</h2>
      <h3 className="text-sm text-neutral-400">{link.link}</h3>
    </div>
  );
}
