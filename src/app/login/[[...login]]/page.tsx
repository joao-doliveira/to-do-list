"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { H1 } from "@/components/ui/H1";
import {
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast,
} from "@/components/shadcn";
import Card from "@/components/ui/Card";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { LogInIcon } from "lucide-react";

import { LogInValues, LogInValuesSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordFormField } from "@/components/PasswordFormField";

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [passwordSubmitError, setPasswordSubmitError] = React.useState("");
  const router = useRouter();
  const form = useForm<LogInValues>({
    resolver: zodResolver(LogInValuesSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { formState, handleSubmit, watch } = form;

  const { dirtyFields } = formState;

  const emailValue = watch("email");
  const passwordValue = watch("password");

  React.useEffect(() => {
    if (passwordValue.length >= 8) {
      setPasswordSubmitError("");
    } else if (dirtyFields.password) {
      setPasswordSubmitError("Passwords must be 8 characters or more.");
    }
  }, [dirtyFields, passwordValue]);

  const disableSubmit =
    !Boolean(dirtyFields.email) ||
    !Boolean(dirtyFields.password) ||
    Boolean(passwordSubmitError);

  // Handle the submission of the sign-in form
  const submit: SubmitHandler<FieldValues> = async (data) => {
    if (!isLoaded) {
      return;
    }

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      const error = JSON.parse(JSON.stringify(err)).errors[0];
      if (error.meta.paramName === "password") {
        setPasswordSubmitError(error.message);
      }

      toast({
        title: "Log in failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Display a form to capture the user's email and password
  return (
    <div className="w-full flex justify-center pt-5 md:pt-8">
      <Card>
        <H1>Log in</H1>
        <Form {...form}>
          <form
            noValidate
            onSubmit={handleSubmit(submit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Enter email address{" "}
                    {!Boolean(emailValue) && (
                      <span className="text-destructive">*</span>
                    )}
                  </FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <PasswordFormField required={!Boolean(passwordValue)} />
            {disableSubmit &&
              (Boolean(passwordSubmitError) ? (
                <p className="text-destructive text-sm font-medium">
                  {passwordSubmitError}
                </p>
              ) : (
                <p className="text-destructive text-sm font-medium">
                  * required fields
                </p>
              ))}
            <div>
              <Button type="submit" disabled={disableSubmit}>
                <LogInIcon className="pr-2" />
                Log in
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
