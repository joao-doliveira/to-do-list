import prisma from "../../db";
import { unstable_cache } from "next/cache";
import { Todo } from "@prisma/client";

export const getToDos = unstable_cache(
  async (ownerId: string | undefined) => {
    if (!ownerId) return [];

    const toDos: Todo[] = await prisma.todo.findMany({
      where: {
        ownerId: ownerId,
      },
      orderBy: {
        deadline: "asc",
      },
    });

    return toDos;
  },
  ["todos"],
  { tags: ["todos"] }
);
