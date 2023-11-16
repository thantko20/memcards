import { AddCardModal } from "@/components/decks/add-card-modal";
import { AuthService } from "@/core/auth/auth.service";
import { CardsService } from "@/core/cards/cards.service";
import { DecksService } from "@/core/decks/decks.service";
import { notFound } from "next/navigation";
import { z } from "zod";

export default async function Page({ params }: { params: { id: string } }) {
  const result = z.string().uuid().safeParse(params.id);
  if (!result.success) {
    notFound();
  }
  const id = result.data;
  await AuthService.authenticate("get");
  const deck = await DecksService.getDeckById(id);
  if (!deck) {
    notFound();
  }

  const cards = await CardsService.getCards({ deckId: deck.id });

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
