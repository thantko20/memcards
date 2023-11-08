import { LoginForm } from "@/components/auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { Lusitana } from "next/font/google";

const lusitana = Lusitana({ weight: "700", subsets: ["latin"] });

export default async function Page() {
  return (
    <div className="min-w-[400px]">
      <h1 className={`font-bold text-4xl text-center ${lusitana.className}`}>
        Memcards
      </h1>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <p>Do not have an account?</p>{" "}
          <Link href="/register" className="ml-2">
            Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
