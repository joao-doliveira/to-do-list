"use server";

import { CreateToDoFormValues } from "@/lib/validation";
import prisma from "../../db";
import { revalidateTag } from "next/cache";

interface CreateToDoProps {
  formData: CreateToDoFormValues;
  ownerId: string;
}

export async function createToDo({ formData, ownerId }: CreateToDoProps) {
  const { title, description, deadline } = formData;

  await prisma.todo.create({
    data: {
      title,
      description,
      deadline,
      ownerId,
    },
  });

  revalidateTag("todos");
}


export async function deleteToDo(toDoId: string) {

  await prisma.todo.delete({
    where: {
      id: toDoId
    }
  });

  revalidateTag("todos");
}
