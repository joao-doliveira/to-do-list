"use client";

import * as React from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/H1";
import Card from "@/components/ui/Card";
import { PasswordInput } from "@/components/ui/PasswordInput";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ArrowUp } from "lucide-react";

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = React.useState(false);
  const [passwordSubmitError, setPasswordSubmitError] = React.useState("");
  const [code, setCode] = React.useState("");
  const router = useRouter();
  const { formState, register, handleSubmit, watch } = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const { dirtyFields, errors } = formState;

  const emailValue = watch("email");
  const firstNameValue = watch("firstName");
  const lastNameValue = watch("lastName");
  const passwordValue = watch("password");

  React.useEffect(() => {
    if (passwordValue.length > 8) {
      setPasswordSubmitError("");
    } else if (dirtyFields.password) {
      setPasswordSubmitError("Passwords must be 8 characters or more.");
    }
  }, [dirtyFields, passwordValue]);

  const allRequiredFieldsTouched =
    Boolean(dirtyFields.email) &&
    Boolean(dirtyFields.password) &&
    Boolean(dirtyFields.firstName) &&
    Boolean(dirtyFields.lastName);

  const disableSubmit =
    !allRequiredFieldsTouched || Boolean(passwordSubmitError);

  // Handle submission of the sign-up form
  const submit: SubmitHandler<FieldValues> = async (data) => {
    if (!isLoaded) return;

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true);
    } catch (err: any) {
      const error = JSON.parse(JSON.stringify(err)).errors[0];
      if (error.meta.paramName === "password") {
        setPasswordSubmitError(error.message);
      }
    }
  };

  // Handle the submission of the verification form
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  // Display the verification form to capture the OTP code
  if (verifying) {
    return (
      <div className="w-full flex justify-center pt-5 md:pt-8">
        <Card>
          <H1>Verify your email</H1>
          <form onSubmit={handleVerify} className="flex flex-col gap-4">
            <Label id="code">Enter your verification code</Label>

            <InputOTP
              maxLength={6}
              value={code}
              id="code"
              name="code"
              onChange={(code) => setCode(code)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <Button type="submit" className="self-start">
              Verify
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  // Display the initial sign-up form to capture the email and password
  return (
    <div className="w-full flex justify-center pt-5 md:pt-8">
      <Card className="min-w-[320px]">
        <H1>Sign up</H1>
        <form
          noValidate
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-4"
        >
          <div>
            <Label htmlFor="firstName">
              First name{" "}
              {!Boolean(firstNameValue) && (
                <span className="text-destructive">*</span>
              )}
            </Label>
            <Input
              id="firstName"
              type="text"
              {...register("firstName", {
                required: true,
              })}
            />
          </div>
          <div>
            <Label htmlFor="lastName">
              Last name{" "}
              {!Boolean(lastNameValue) && (
                <span className="text-destructive">*</span>
              )}
            </Label>
            <Input
              id="lastName"
              type="text"
              {...register("lastName", {
                required: true,
              })}
            />
          </div>
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
            <Button
              type="submit"
              disabled={disableSubmit}
              variant="defaultOutline"
            >
              <ArrowUp className="pr-2" />
              Sign up
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
