"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Kbd } from "./ui/kbd";

export default function CreateLink() {
  return (
    <div className="border p-2 flex flex-col gap-2">
      <div>create</div>
      <div className="flex flex-row gap-2">
        <Input placeholder="link" />
        <Input placeholder="path" />
        <Button variant="outline">
          Create<Kbd>⏎</Kbd>
        </Button>
      </div>
    </div>
  );
}
