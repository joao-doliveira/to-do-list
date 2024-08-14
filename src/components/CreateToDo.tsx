import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { H1 } from "./ui/H1";
import { Textarea } from "./ui/textarea";

const CreateToDo = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="self-start">
          <PlusIcon className="pr-2" />
          Create to do
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <H1>Create to do</H1>
          </DialogTitle>
          <DialogDescription>
            Fill the form to create a new to do:
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateToDo;
