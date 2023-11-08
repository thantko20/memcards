import { LoginForm } from "@/components/auth";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { cn } from "@/utils/ui";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="min-w-[400px]">
      <h1 className="font-bold text-4xl">Memcards</h1>
      <Card className="">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
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
