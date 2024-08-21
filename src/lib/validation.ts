import { z } from "zod";

export const CreateUserSchema = z
  .object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
  })
  .transform(({ firstName, lastName, ...rest }) => ({
    ...rest,

    fullName: `${firstName} ${lastName}`,
    firstName: firstName,
    lastName: lastName,
  }));

export type CreateUser = z.output<typeof CreateUserSchema>;

export const CreateToDoSchema = z.object({
  title: z.string(),
  description: z.string(),
  deadline: z.string(),
});

export type CreateToDo = z.infer<typeof CreateToDoSchema>;
