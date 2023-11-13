"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

export const CreateDeckForm = () => {
  const [state, action] = useFormState(createDeckAction, undefined);
  const form = useForm<CreateDeck>({
    defaultValues: {
      description: "",
      name: ""
    },
    resolver: zodResolver(CreateDeckSchema)
  });

  return (
    <Form {...form}>
      <form
        action={async () => {
          const isValid = await form.trigger();
          if (!isValid) return;
          action(form.getValues());
        }}
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
