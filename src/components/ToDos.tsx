import { getToDos } from "@/lib/data";
import React from "react";
import TerminateToDoButton from "./TerminateToDoButton";
import { format } from "date-fns";
import Card from "./ui/Card";

interface ToDosProps {
  ownerId: string;
}

const ToDos = async ({ ownerId }: ToDosProps) => {
  const toDos = await getToDos(ownerId);

  return (
    <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4 md:py-6">
      {toDos.map((todo) => (
        <Card key={todo.id}>
          <p className="font-bold">{todo.title}</p>
          <p className="line-clamp-3 h-[72px]">{todo.description}</p>
          <p className="font-bold pt-2">
            Deadline: {format(todo.deadline, "MMMM do, yyyy")}
          </p>

          <TerminateToDoButton todo={todo} />
        </Card>
      ))}
    </div>
  );
};

export default ToDos;
