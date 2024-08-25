"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { H1 } from "@/components/ui/H1";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Input } from "@/components/ui/input";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { LogInIcon } from "lucide-react";

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [passwordSubmitError, setPasswordSubmitError] = React.useState("");
  const router = useRouter();
  const { formState, register, handleSubmit, watch } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { dirtyFields, errors } = formState;

  const emailValue = watch("email");
  const passwordValue = watch("password");

  React.useEffect(() => {
    if (passwordValue.length > 8) {
      setPasswordSubmitError("");
    } else if (dirtyFields.password) {
      setPasswordSubmitError("Passwords must be 9 characters or more.");
    }
  }, [dirtyFields, passwordValue]);

  const allRequiredFieldsTouched =
    Boolean(dirtyFields.email) && Boolean(dirtyFields.password);

  const disableSubmit =
    !allRequiredFieldsTouched || Boolean(passwordSubmitError);

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
    }
  };

  // Display a form to capture the user's email and password
  return (
    <div className="w-full flex justify-center pt-5 md:pt-8">
      <Card>
        <H1>Log in</H1>
        <form
          noValidate
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-4"
        >
          <div>
            <Label htmlFor="email">
              Enter email address{" "}
              {!Boolean(emailValue) && (
                <span className="text-destructive">*</span>
              )}
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email address.",
                },
              })}
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-2">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="relative">
            <Label htmlFor="password">
              Enter password{" "}
              {!Boolean(passwordValue) && (
                <span className="text-destructive">*</span>
              )}
            </Label>
            <PasswordInput
              passwordValue={passwordValue}
              {...register("password")}
            />
            {Boolean(passwordSubmitError) && (
              <p className="text-destructive text-sm mt-2">
                {passwordSubmitError}
              </p>
            )}
          </div>
          {!allRequiredFieldsTouched && (
            <p className="text-destructive text-sm">* required fields</p>
          )}
          <div>
            <Button type="submit" disabled={disableSubmit}>
              <LogInIcon className="pr-2" />
              Log in
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
