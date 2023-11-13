import { CreateDeckForm } from "@/components/decks";
import { getCurrentUserDecks } from "@/data/decks.data";
import { getCurrentUser } from "@/data/users.data";
import { notFound } from "next/navigation";

export default async function Page() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    notFound();
  }

  const decks = await getCurrentUserDecks();

  return (
    <>
      <div>Show the decks</div>
      {decks.map((deck) => (
        <p key={deck.id}>{deck.name}</p>
      ))}
      <div className="max-w-md mx-auto">
        <CreateDeckForm />
      </div>
    </>
  );
}
