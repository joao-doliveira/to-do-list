"use client";

import { deleteToDo } from "@/app/actions";
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  toast,
} from "./shadcn";
import { Title } from "./ui/Title";
import { CheckIcon } from "lucide-react";
import React from "react";
import { Todo } from "@prisma/client";
import { format } from "date-fns";

const TerminateToDoButton = ({ todo }: { todo: Todo }) => {
  const [open, setOpen] = React.useState(false);

  const finishToDo = async () => {
    try {
      await deleteToDo(todo.id).then(() => {
        setOpen(false);
        toast({
          title: "This to do is done!",
          description: `Your to do "${todo.title}" was successfully finished!`,
          variant: "default",
        });
      });
    } catch (error) {
      const err = new Error(JSON.stringify(error));
      toast({
        title: "Failed to create to do",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="self-start">
          <CheckIcon className="pr-2" />
          TERMINATE TO DO
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <Title>Confirm to do TERMINATION</Title>
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to TERMINATE this to do?
          </DialogDescription>
          <div className="pt-6 pb-4">
            <div className="border-l-2 border-secondary flex flex-col gap-2 px-2 md:px-4">
              <p className="font-bold">{todo.title}</p>
              <p className="text-secondary">{todo.description}</p>
              <p className="font-bold">
                Deadline:{" "}
                <span className="text-primary">
                  {format(todo.deadline, "MMMM do, yyyy")}
                </span>
              </p>
            </div>
          </div>
        </DialogHeader>
        <form action={finishToDo}>
          <Button type="submit">TERMINATE</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TerminateToDoButton;
