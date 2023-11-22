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
import { CreateDeck, CreateDeckSchema } from "@/core/decks/decks.validations";
import { createDeckAction } from "@/actions/decks.actions";
import { useToast } from "../ui/use-toast";
import { useAction } from "next-safe-action/hook";
import { Button } from "../ui/button";

export const CreateDeckForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { toast } = useToast();
  const form = useForm<CreateDeck>({
    defaultValues: {
      description: "",
      name: ""
    },
    resolver: zodResolver(CreateDeckSchema)
  });

  const { status, execute } = useAction(createDeckAction, {
    onSuccess,
    onError: (e) => {
      toast({
        description: e.serverError,
        variant: "destructive"
      });
    }
  });

  return (
    <Form {...form}>
      <form
        action={async () => {
          if (await form.trigger()) {
            execute(form.getValues());
          }
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
        <Button type="submit" isLoading={status === "executing"}>
          Create
        </Button>
      </form>
    </Form>
  );
};
