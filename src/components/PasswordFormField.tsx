"use client"

import { EyeOffIcon, EyeIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel,
  Input,
} from "@/components/shadcn";
import { createElement, useState } from "react";

type PasswordFormFieldProps = {
  name?: string;
  placeholder?: string;
  description?: string | JSX.Element;
  required: boolean;
};

export function PasswordFormField({
  name = "password",
  placeholder = "Enter password",
  description,
  required,
}: PasswordFormFieldProps) {
  const { control, getFieldState } = useFormContext();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              <FormLabel>
                Password{" "}
                {required && <span className="text-destructive">*</span>}
              </FormLabel>
              <Input
                {...field}
                type={passwordVisibility ? "text" : "password"}
                autoComplete="on"
                placeholder={placeholder}
                className={`pr-12 mt-1 ${
                  getFieldState(name).error && "text-destructive"
                }`}
              />
              <div
                className="absolute inset-y-0 right-0 cursor-pointer self-end px-3 pb-2 text-muted-foreground"
                onClick={() => setPasswordVisibility(!passwordVisibility)}
              >
                {createElement(passwordVisibility ? EyeOffIcon : EyeIcon, {
                  className: "h-6 w-6",
                })}
              </div>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
