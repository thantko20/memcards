import { Header } from "@/components/app-header";
import { getCurrentUser } from "@/data-access/users";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const currentUser = await getCurrentUser({});
  return (
    <div>
      <Header user={currentUser} />
      <main className="px-2 py-4 md:container mx-auto">{children}</main>
    </div>
  );
}
