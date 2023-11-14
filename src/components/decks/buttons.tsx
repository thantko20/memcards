"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export const CreateDeckButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending} className="w-full">
      Create
    </Button>
  );
};
