import { DecksContainer, DecksContainerSkeleton } from "@/components/decks";
import { CreateDeckModal } from "@/components/decks/create-deck-modal";
import { getCurrentUserDecks } from "@/data-access/decks";
import { Suspense } from "react";

export default async function Page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          My Decks
        </h2>
        <CreateDeckModal />
      </div>
      <Suspense fallback={<DecksContainerSkeleton />}>
        <DecksContainer getDecks={() => getCurrentUserDecks({})} />
      </Suspense>
    </>
  );
}
