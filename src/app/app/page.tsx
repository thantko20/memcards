import { DeckCard } from "@/components/decks";
import { CreateDeckModal } from "@/components/decks/create-deck-modal";
import { getCurrentUserDecks } from "@/data-access/decks";
import { getCurrentUser } from "@/data-access/users";
import { notFound } from "next/navigation";

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
