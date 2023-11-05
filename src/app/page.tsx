import { Button } from "@/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { db } from "@/lib/db";
import { decks } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { DeckForm } from "./deck-form";

export default async function Home() {
  const results = await db.select().from(decks);

  async function createDeck(state: any, formData: FormData) {
    "use server";
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      await db.insert(decks).values({
        name: formData.get("name") as string,
        description: formData.get("description") as string
      });
      revalidatePath("/");
      return { name: "", description: "" };
    } catch (error) {
      return Object.fromEntries(formData);
    }
  }

  return (
    <>
      <DeckForm createDeck={createDeck} />
      {results.map((deck) => (
        <p key={deck.id}>{deck.name}</p>
      ))}
    </>
  );
}
