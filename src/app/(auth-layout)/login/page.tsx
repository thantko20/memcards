import { LoginForm } from "@/components/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Link } from "@/components/ui/link";
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
