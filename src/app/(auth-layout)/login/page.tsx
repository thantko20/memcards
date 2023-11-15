import { LoginForm } from "@/components/auth";
import { Lusitana } from "next/font/google";

const lusitana = Lusitana({ weight: "700", subsets: ["latin"] });

export default async function Page() {
  return (
    <div>
      <h1 className={`font-bold text-4xl text-center ${lusitana.className}`}>
        Memcards
      </h1>
      <LoginForm />
    </div>
  );
}
