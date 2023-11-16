"use client";

import { AddCard, AddCardSchema } from "@/core/cards/cards.validation";
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
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { useModalState } from "@/hooks";

const AddCardForm = ({ deckId }: { deckId: string }) => {
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
    <Form {...form}>
      <form action="" className="space-y-4">
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
        <Button className="w-full" type="submit">
          Add
        </Button>
      </form>
    </Form>
  );
};

export const AddCardModal = ({ deckId }: { deckId: string }) => {
  const { isOpen, onChange, open } = useModalState("add-card");
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogTrigger asChild>
        <Button onClick={open}>Add Card</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a card</DialogTitle>
        </DialogHeader>
        <AddCardForm deckId={deckId} />
      </DialogContent>
    </Dialog>
  );
};
