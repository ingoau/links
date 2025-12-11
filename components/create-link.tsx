"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Kbd } from "./ui/kbd";
import * as links from "@/lib/links";

export default function CreateLink() {
  return (
    <div className="border p-2 flex flex-col gap-2">
      <div>create</div>
      <Form />
    </div>
  );
}

function Form() {
  return (
    <form className="flex flex-row gap-2" action={() => links.create()}>
      <Input placeholder="link" name="link" required autoFocus />
      <Input placeholder="path" name="path" />
      <Button variant="outline">
        Create<Kbd>⏎</Kbd>
      </Button>
    </form>
  );
}
