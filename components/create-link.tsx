import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Kbd } from "./ui/kbd";

export default function CreateLink() {
  return (
    <div className="border p-2 flex flex-col gap-2">
      <div>create</div>
      <form
        className="flex flex-row gap-2"
        action={async () => {
          "use server";
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }}
      >
        <Input placeholder="link" name="link" required autoFocus />
        <Input placeholder="path" name="path" />
        <Button variant="outline">
          Create<Kbd>⏎</Kbd>
        </Button>
      </form>
    </div>
  );
}
