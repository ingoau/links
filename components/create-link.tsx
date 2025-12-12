"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Kbd } from "./ui/kbd";
import * as links from "@/lib/links";
import { useState } from "react";

export default function CreateLink({
  refetchAction,
}: {
  refetchAction: () => Promise<void>;
}) {
  const [pending, setPending] = useState(false);

  return (
    <div className="border p-2 flex flex-col gap-2">
      <div>create</div>
      <form
        className="flex flex-row gap-2"
        onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);

          setPending(true);
          try {
            await links.create(
              formData.get("link")?.toString() || "",
              formData.get("path")?.toString() || "",
            );
            refetchAction();
          } finally {
            setPending(false);
          }

          event.currentTarget.reset();
        }}
      >
        <Input
          type="url"
          disabled={pending}
          placeholder="link"
          name="link"
          required
          autoFocus
        />
        <Input disabled={pending} placeholder="path" name="path" />
        <Button variant="outline" disabled={pending}>
          create<Kbd>⏎</Kbd>
        </Button>
      </form>
    </div>
  );
}
