"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { CreateDeckForm } from ".";
import { useDisclosure } from "@/hooks";

export function CreateDeckModal() {
  const { isOpen, onChange, close } = useDisclosure();

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogTrigger asChild>
        <Button variant="outline" leftSection={<Plus />}>
          Add Deck
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a deck</DialogTitle>
        </DialogHeader>
        <CreateDeckForm onSuccess={close} />
      </DialogContent>
    </Dialog>
  );
}
