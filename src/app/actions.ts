"use server";

import { CreateToDoFormValues } from "@/lib/validation";
import prisma from "../../db";

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
}
