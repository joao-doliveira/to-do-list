import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email({
    message: "Please enter an email address with proper format."
  }),
  firstName: z.string(),
  lastName: z.string(),
});

export type User = z.output<typeof UserSchema>;

// --------------------------------------------------

export const CreateUserSchema = z.object({
  id: z.string(),
  fullName: z.string(),
}).and(UserSchema)

export type CreateUser = z.output<typeof CreateUserSchema>;

// --------------------------------------------------

export const CreateClerkUserSchema = z.object({
  password: z.string().min(8, {
    message: "Passwords must be 8 characters or more."
  }),
}).and(UserSchema)

export type CreateClerkUser = z.output<typeof CreateClerkUserSchema>;

// --------------------------------------------------

export const CreateToDoFormValuesSchema = z.object({
  deadline: z.date(),
  description: z.string().min(1),
  title: z.string().min(1),
});

export type CreateToDoFormValues = z.infer<typeof CreateToDoFormValuesSchema>;

// --------------------------------------------------

export const LogInValuesSchema = z.object({
  email: z.string().email({
    message: "Please enter an email address with proper format."
  }),
  password: z.string().min(8, {
    message: "Passwords must be 8 characters or more."
  }),
});

export type LogInValues = z.infer<typeof LogInValuesSchema>;

// --------------------------------------------------

export const ToDoSchema = z.object({
  ownerId: z.string().uuid(),
}).and(CreateToDoFormValuesSchema);

export type ToDo = z.infer<typeof ToDoSchema>;



