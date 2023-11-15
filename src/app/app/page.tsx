import { CreateDeckForm } from "@/components/decks";
import { CreateDeckModal } from "@/components/decks/create-deck-modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { getCurrentUserDecks } from "@/data/decks.data";
import { getCurrentUser } from "@/data/users.data";
import { Deck, User } from "@/lib/db/schema";
import { Eye } from "lucide-react";
import { notFound } from "next/navigation";

type DeckWithAuthor = Deck & { author: User };

const DeckCard = ({ deck }: { deck: DeckWithAuthor }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{deck.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="break-all h-12">{deck.description}</p>
        <p className="text-xs mt-2 italic">Created by {deck.author.name}</p>
      </CardContent>
      <CardFooter>
        <Button
          variant="default"
          className="w-full"
          leftSection={<Eye size={16} />}
        >
          View
        </Button>
      </CardFooter>
    </Card>
  );
};

export default async function Page() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    notFound();
  }

  const decks = await getCurrentUserDecks();

  return (
    <>
      <div className="flex justify-end">
        <CreateDeckModal />
      </div>
      <div className="grid grid-cols-1 py-4 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {decks.map((deck) => (
          <DeckCard deck={deck} key={deck.id} />
        ))}
      </div>
    </>
  );
}
