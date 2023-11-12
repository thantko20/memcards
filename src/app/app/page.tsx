import { getCurrentUser } from "@/data/users.data";
import Image from "next/image";

export default async function Page() {
  const currentUser = await getCurrentUser();
  return (
    <>
      <div>Show the decks</div>
      <div className="flex items-center gap-2">
        <Image
          src={currentUser?.avatar ?? ""}
          alt="user avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        <p>{currentUser?.email}</p>
      </div>
    </>
  );
}
