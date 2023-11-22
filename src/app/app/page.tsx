import { DeckCard } from "@/components/decks";
import { CreateDeckModal } from "@/components/decks/create-deck-modal";
import { getCurrentUserDecks } from "@/data-access/decks";

export default async function Page() {
  const decks = await getCurrentUserDecks({});

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          My Decks
        </h2>
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
