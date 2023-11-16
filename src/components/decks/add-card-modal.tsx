"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useDisclosure, useModalState } from "@/hooks";
import { AddCardForm } from "./add-card-form";
export const AddCardModal = () => {
  const { isOpen, onChange, open, close } = useDisclosure();

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogTrigger asChild>
        <Button onClick={open}>Add Card</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a card</DialogTitle>
        </DialogHeader>
        <AddCardForm onSuccess={close} />
      </DialogContent>
    </Dialog>
  );
};
