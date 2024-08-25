"use server";

import prisma from "../../../../db";
import { type CreateUser } from "@/lib/validation";

export async function createUser(createUserData: CreateUser) {
  await prisma.user.create({
    data: {
      id: createUserData.id,
      email: createUserData.email,
      firstName: createUserData.firstName,
      lastName: createUserData.lastName,
      fullName: `${createUserData.firstName} ${createUserData.lastName}`,
    },
  });
}
