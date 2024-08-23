"use server";

import prisma from "../../../../db";
import { type CreateUser } from "@/lib/validation";

export async function createUser(formData: CreateUser) {
  await prisma.user.create({
    data: {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      fullName: `${formData.firstName} ${formData.lastName}`,
    },
  });
}
