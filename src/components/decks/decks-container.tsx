import { DeckCard } from "./deck-card";
import { DeckWithAuthor } from "./types";

type Props = {
  getDecks: () => Promise<DeckWithAuthor[]>;
};

export const DecksContainer = async ({ getDecks }: Props) => {
  const decks = await getDecks();

  return (
    <div className="grid grid-cols-1 py-4 gap-4 sm:grid-cols-2 md:grid-cols-4">
      {decks.map((deck) => (
        <DeckCard deck={deck} key={deck.id} />
      ))}
    </div>
  );
};
