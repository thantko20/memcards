import { CreateDeckForm } from "@/components/decks";
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
import { Deck } from "@/lib/db/schema";
import { Eye } from "lucide-react";
import { notFound } from "next/navigation";

const DeckCard = ({ deck }: { deck: Deck }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{deck.name}</CardTitle>
      </CardHeader>
      <CardContent className="break-all">{deck.description}</CardContent>
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {decks.map((deck) => (
          <DeckCard deck={deck} key={deck.id} />
        ))}
      </div>
      <div className="max-w-md mx-auto">
        <CreateDeckForm />
      </div>
    </>
  );
}
