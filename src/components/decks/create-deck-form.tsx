"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { Input } from "../ui/input";
import { CreateDeckButton } from "./buttons";
import { CreateDeck, CreateDeckSchema } from "@/core/decks/decks.validations";
import { useFormState } from "react-dom";
import { createDeckAction } from "@/actions/decks.actions";
import { useToast } from "../ui/use-toast";
import { useEffect } from "react";
import { useActionForm } from "@/hooks/useActionForm";

export const CreateDeckForm = () => {
  const { toast } = useToast();
  const { action, state } = useActionForm(createDeckAction, {
    onError: (error) => {
      if (error instanceof Error) {
        toast({ description: error.message, variant: "destructive" });
      }
    }
  });
  const form = useForm<CreateDeck>({
    defaultValues: {
      description: "",
      name: ""
    },
    resolver: zodResolver(CreateDeckSchema)
  });

  // useEffect(() => {
  //   if (state?.message) {
  //     toast({ description: state.message, variant: "destructive" });
  //   }
  // }, [state, toast]);

  return (
    <Form {...form}>
      <form
        action={async () => {
          const isValid = await form.trigger();
          if (!isValid) return;
          action(form.getValues());
        }}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CreateDeckButton />
      </form>
    </Form>
  );
};
