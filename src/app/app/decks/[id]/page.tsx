import { AddCardModal } from "@/components/decks/add-card-modal";
import { fetchCards } from "@/data-access/cards";
import { getDeckById } from "@/data-access/decks";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const deck = await getDeckById({ id: params.id });
  if (!deck) {
    notFound();
  }

  const cards = await fetchCards({ deckId: deck.id });

  return (
    <>
      <h2 className="text-5xl font-semibold">{deck.name}</h2>
      <p>{deck.description}</p>
      <AddCardModal />
      <div>
        {cards.map((card) => (
          <div key={card.id}>
            <h3>{card.question}</h3>
            <p>{card.answer}</p>
          </div>
        ))}
      </div>
    </>
  );
}
