import { RegisterWrapper } from "@/components/auth/register-wrapper";
import { Metadata } from "next";
import { Lusitana } from "next/font/google";

const lusitana = Lusitana({ weight: "700", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Registration"
};

export default function Page() {
  return (
    <div>
      <h1 className={`font-bold text-4xl text-center ${lusitana.className}`}>
        Memcards
      </h1>
      <RegisterWrapper />
    </div>
  );
}
