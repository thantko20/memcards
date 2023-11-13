import { CreateDeckForm } from "@/components/decks";
import { getCurrentUser } from "@/data/users.data";
import { notFound } from "next/navigation";

export default async function Page() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    notFound();
  }

  return (
    <>
      <div>Show the decks and</div>
      <div className="max-w-md mx-auto">
        <CreateDeckForm />
      </div>
    </>
  );
}
