import { Header } from "@/components/app-header";
import { getCurrentUser } from "@/data/users.data";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const currentUser = await getCurrentUser();
  return (
    <div className="md:container mx-auto">
      <Header user={currentUser} />
      <main className="px-2 py-4">{children}</main>
    </div>
  );
}
