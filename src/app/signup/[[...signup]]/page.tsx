"use client";

import * as React from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Label,
} from "@/components/shadcn";
import { H1 } from "@/components/ui/H1";
import Card from "@/components/ui/Card";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ArrowUp } from "lucide-react";
import { createUser } from "./actions";
import {
  CreateClerkUser,
  CreateClerkUserSchema,
  CreateUser,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordFormField } from "@/components/PasswordFormField";

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = React.useState(false);
  const [passwordSubmitError, setPasswordSubmitError] = React.useState("");
  const [code, setCode] = React.useState("");
  const defaultValues = {
    email: "",
    firstName: "",
    lastName: "",
  };
  const form = useForm<CreateClerkUser>({
    resolver: zodResolver(CreateClerkUserSchema),
    defaultValues: { ...defaultValues, password: "" },
  });
  const { formState, handleSubmit, watch } = form;
  const [formSubmittedData, setFormSubmittedData] = React.useState<Omit<
    CreateUser,
    "id"
  > | null>(null);
  const router = useRouter();

  const { dirtyFields } = formState;

  const emailValue = watch("email");
  const firstNameValue = watch("firstName");
  const lastNameValue = watch("lastName");
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
    !Boolean(dirtyFields.firstName) ||
    !Boolean(dirtyFields.lastName) ||
    Boolean(passwordSubmitError);

  // Handle submission of the sign-up form
  const submit: SubmitHandler<FieldValues> = async (data) => {
    if (!isLoaded) return;

    const userData: Omit<CreateUser, "id"> = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: `${data.firstName} ${data.lastName}`,
    };

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      });

      setFormSubmittedData(userData);

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

        if (formSubmittedData && signUp.createdUserId) {
          const createUserData: CreateUser = {
            ...formSubmittedData,
            id: signUp.createdUserId,
          };
          await createUser(createUserData);
        }
        setFormSubmittedData(null);
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
    <section className="w-full flex justify-center pt-5 md:pt-8">
      <Card className="min-w-[320px]">
        <H1>Sign up</H1>
        <Form {...form}>
          <form
            noValidate
            onSubmit={handleSubmit(submit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    First name{" "}
                    {!Boolean(firstNameValue) && (
                      <span className="text-destructive">*</span>
                    )}
                  </FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Last name{" "}
                    {!Boolean(lastNameValue) && (
                      <span className="text-destructive">*</span>
                    )}
                  </FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

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
        </Form>
      </Card>
    </section>
  );
}
