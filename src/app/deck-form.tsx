"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";

const Submit = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submitting" : "Submit"}
    </Button>
  );
};

export const DeckForm = ({ createDeck }) => {
  const [state, action] = useFormState<
    Partial<{ name: string; description: string }>
  >(createDeck, { description: "", name: "" });

  return (
    <form
      className="flex flex-col gap-6 lg:container mx-auto mt-12"
      action={action}
    >
      <Input name="name" />
      <Input type="text" name="description" />
      <Submit />
    </form>
  );
};
