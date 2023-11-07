import { RegisterForm } from "@/app/components/auth";
import { Button, buttonVariants } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter } from "@/app/components/ui/card";
import { cn } from "@/utils/ui";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Registration"
};

export default function Page() {
  return (
    <div className="min-w-[400px]">
      <h1 className="font-bold text-4xl">Memcards</h1>
      <Card className="mt-8">
        <CardContent className="p-6">
          <RegisterForm />
        </CardContent>
        <CardFooter>
          <p>Already have an account?</p>{" "}
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "link" }), "p-0 m-0 ml-2")}
          >
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
