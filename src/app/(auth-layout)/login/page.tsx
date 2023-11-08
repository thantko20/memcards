import { LoginForm } from "@/components/auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Link } from "@/components/ui/link";

export default async function Page() {
  return (
    <div className="min-w-[400px]">
      <h1 className="font-bold text-4xl">Memcards</h1>
      <Card className="mt-4">
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
