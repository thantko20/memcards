import { LoginForm } from "@/app/components/auth";
import { buttonVariants } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter } from "@/app/components/ui/card";
import { cn } from "@/utils/ui";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="min-w-[400px]">
      <h1 className="font-bold text-4xl">Memcards</h1>
      <Card className="mt-8">
        <CardContent className="p-6">
          <LoginForm />
        </CardContent>
        <CardFooter>
          <p>Do not have an account?</p>{" "}
          <Link
            href="/register"
            className={cn(buttonVariants({ variant: "link" }), "p-0 m-0 ml-2")}
          >
            Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
