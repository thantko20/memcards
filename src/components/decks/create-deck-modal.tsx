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
import { useRouter, useSearchParams } from "next/navigation";

export function CreateDeckModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isModalOpen = searchParams.get("modal") === "createDeck";

  const onOpenChange = (open: boolean) => {
    const params = new URLSearchParams(searchParams);
    if (open) {
      params.set("modal", "createDeck");
    } else {
      params.delete("modal");
    }

    router.replace(`?${params.toString()}`);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" leftSection={<Plus />}>
          Add Deck
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a deck</DialogTitle>
        </DialogHeader>
        <CreateDeckForm />
      </DialogContent>
    </Dialog>
  );
}
