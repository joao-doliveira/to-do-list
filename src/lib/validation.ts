import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
});

export type User = z.output<typeof UserSchema>;

export const CreateUserSchema = z.object({
  fullName: z.string(),
}).and(UserSchema)

export type CreateUser = z.output<typeof CreateUserSchema>;

export const CreateClerkUserSchema = z.object({
  password: z.string(),
}).and(UserSchema)

export type CreateClerkUser = z.output<typeof CreateClerkUserSchema>;

export const CreateToDoSchema = z.object({
  title: z.string(),
  description: z.string(),
  deadline: z.string(),
});

export type CreateToDo = z.infer<typeof CreateToDoSchema>;
