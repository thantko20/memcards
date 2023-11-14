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

export function CreateDeckModal() {
  return (
    <Dialog>
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
