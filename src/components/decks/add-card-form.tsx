"use client";

import { addCardAction } from "@/actions/cards.actions";
import { AddCard, AddCardSchema } from "@/core/cards/cards.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus, useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form
} from "../ui/form";
import { Input } from "../ui/input";
import { notFound, useParams } from "next/navigation";
import { useActionForm } from "@/hooks/useActionForm";

const AddCardButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" isLoading={pending}>
      Add
    </Button>
  );
};

export const AddCardForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { id: deckId } = useParams();
  const { state, action } = useActionForm(addCardAction, {
    onError(error) {
      console.log(error);
    },
    onSuccess
  });

  if (typeof deckId !== "string") {
    notFound();
  }

  const form = useForm<AddCard>({
    resolver: zodResolver(AddCardSchema),
    defaultValues: {
      answer: "",
      deckId,
      hint: "",
      question: ""
    }
  });
  return (
    <>
      {state?.message ? (
        <Alert>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}
      <Form {...form}>
        <form
          action={async () => {
            const valid = await form.trigger();
            if (valid) action(form.getValues());
          }}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter question" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter answer" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hint</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter hint" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AddCardButton />
        </form>
      </Form>
    </>
  );
};
