import { AddCardModal } from "@/components/decks/add-card-modal";
import { Button } from "@/components/ui/button";
import { fetchCards } from "@/data-access/cards";
import { getDeckById } from "@/data-access/decks";
import { getCurrentUser } from "@/data-access/users";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const deck = await getDeckById({ id: params.id });
  if (!deck) {
    notFound();
  }
  const user = await getCurrentUser({});

  const cards = await fetchCards({ deckId: deck.id });

  return (
    <div className="max-w-3xl mx-auto pt-8">
      <div className="pb-12">
        <h2 className="text-5xl font-semibold">{deck.name}</h2>
        <p>{deck.description}</p>
      </div>
      <div className="flex gap-4">
        {user.id === deck.authorId && <AddCardModal />}
        <Button variant="outline">Review the deck</Button>
      </div>
      <div className="flex flex-col gap-4 mt-12">
        {cards.map((card) => (
          <div
            key={card.id}
            className="p-4 border-2 border-gray-300 dark:border-gray-800 rounded flex items-center justify-between"
          >
            <h3 className="text-xl font-semibold">{card.question}</h3>
            <p>{card.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
