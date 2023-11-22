import { DecksContainer, DecksContainerSkeleton } from "@/components/decks";
import { getPublicDecks } from "@/data-access/decks";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense fallback={<DecksContainerSkeleton />}>
      <DecksContainer getDecks={() => getPublicDecks({})} />
    </Suspense>
  );
}
