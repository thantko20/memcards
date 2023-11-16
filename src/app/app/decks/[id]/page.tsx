import { AddCardModal } from "@/components/decks/add-card-modal";
import { Button } from "@/components/ui/button";
import { DecksService } from "@/core/decks/decks.service";
import { authenticate } from "@/utils";
import { notFound } from "next/navigation";
import { z } from "zod";

export default async function Page({ params }: { params: { id: string } }) {
  const result = z.string().uuid().safeParse(params.id);
  if (!result.success) {
    notFound();
  }
  const id = result.data;
  await authenticate("get");
  const deck = await DecksService.getDeckById(id);
  if (!deck) {
    notFound();
  }

  return (
    <>
      <h2 className="text-5xl font-semibold">{deck.name}</h2>
      <p>{deck.description}</p>
      <AddCardModal deckId={deck.id} />
    </>
  );
}
