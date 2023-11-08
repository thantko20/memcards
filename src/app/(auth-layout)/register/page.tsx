import { RegisterForm } from "@/components/auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration"
};

export default function Page() {
  return (
    <div className="min-w-[400px]">
      <h1 className="font-bold text-4xl">Memcards</h1>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter>
          <p>Already have an account?</p>{" "}
          <Link href="/login" className="ml-2">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
