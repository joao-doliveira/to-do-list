"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Title } from "./ui/Title";
import { createToDo } from "@/app/actions";
import {
  CreateToDoFormValues,
  CreateToDoFormValuesSchema,
} from "@/lib/validation";
import { toast } from "./ui/use-toast";

interface CreateToDoFormProps {
  userId: string;
}

export function CreateToDoForm({ userId }: CreateToDoFormProps) {
  const [open, setOpen] = React.useState(false);
  const form = useForm<CreateToDoFormValues>({
    resolver: zodResolver(CreateToDoFormValuesSchema),
    defaultValues: {
      title: "",
      description: "",
      deadline: undefined,
    },
  });

  const watch = form.watch;
  const dirtyFields = form.formState.dirtyFields;

  const titleValue = watch("title");
  const descriptionValue = watch("description");
  const deadlineValue = watch("deadline");

  const disableSubmit =
    !Boolean(dirtyFields.title) ||
    !Boolean(dirtyFields.description) ||
    !Boolean(dirtyFields.deadline);

  async function onSubmit(data: CreateToDoFormValues) {

    try {
      await createToDo({ formData: data, ownerId: userId }).then(() => {
        setOpen(false);
        toast({
          title: "To do created!",
          description: "Your to do was successfully created!",
          variant: "default",
        });
      }); 
    } catch (error) {
      const err = new Error(JSON.stringify(error))
      console.log("err: ", err)
      toast({
        title: "Failed to create to do",
        description: err.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="self-start">
          <PlusIcon className="pr-2" />
          Create to do
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <Title>Create to do</Title>
          </DialogTitle>
          <DialogDescription>
            Fill the form to create a new to do:
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Title{" "}
                    {!Boolean(titleValue) && (
                      <span className="text-destructive">*</span>
                    )}
                  </FormLabel>
                  <Input {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Description{" "}
                    {!Boolean(descriptionValue) && (
                      <span className="text-destructive">*</span>
                    )}
                  </FormLabel>
                  <Textarea {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Deadline{" "}
                    {!Boolean(deadlineValue) && (
                      <span className="text-destructive">*</span>
                    )}
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={{ before: new Date() }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {disableSubmit && (
              <p className="text-destructive">* Required fields</p>
            )}
            <Button disabled={disableSubmit} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
