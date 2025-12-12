"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Kbd } from "./ui/kbd";
import * as links from "@/lib/links";

export default function CreateLink() {
  return (
    <div className="border p-2 flex flex-col gap-2">
      <div>create</div>
      <form
        className="flex flex-row gap-2"
        action={(event) =>
          links.create(
            event.get("link")?.toString() || "",
            event.get("path")?.toString() || "",
          )
        }
      >
        <FormFields />
      </form>
    </div>
  );
}

function FormFields() {
  const { pending } = useFormStatus();

  return (
    <>
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
    </>
  );
}
