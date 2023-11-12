import { CheckEmailForm, RegisterForm } from "@/components/auth";
import { GoogleSignInButton } from "@/components/auth/buttons";
import { RegisterWrapper } from "@/components/auth/register-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { Metadata } from "next";
import { Lusitana } from "next/font/google";
import { cookies } from "next/headers";

const lusitana = Lusitana({ weight: "700", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Registration"
};

export default function Page() {
  const email = cookies().get("email")?.value;
  return (
    <div>
      <h1 className={`font-bold text-4xl text-center ${lusitana.className}`}>
        Memcards
      </h1>
      <RegisterWrapper />
    </div>
  );
}
