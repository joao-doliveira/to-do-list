import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

export default function Home() {
  return (
    <div className="p-10 flex gap-2">
      <Button>
        <Trash2Icon /> Test
      </Button>
      <Button variant="defaultOutline">
        <Trash2Icon /> Test
      </Button>
      <Button variant="destructiveOutline">
        <Trash2Icon /> Test
      </Button>
      <Button variant="secondary">
        <Trash2Icon /> Test
      </Button>
      <Button variant="secondaryOutline">
        <Trash2Icon /> Test
      </Button>
    </div>
  );
}
