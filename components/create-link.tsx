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
    <div className="md:col-span-2 py-4">
      <div className="flex flex-col gap-2 max-w-md mx-auto">
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
              (event.target as HTMLFormElement).reset();
            } finally {
              setPending(false);
            }
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
    </div>
  );
}
