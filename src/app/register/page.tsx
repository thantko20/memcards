import { Metadata } from "next";
import { RegisterForm } from "../components/auth";
import { Card, CardContent } from "../components/ui/card";

export const metadata: Metadata = {
  title: "Registration"
};

export default function Page() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="min-w-[400px]">
        <h1 className="font-bold text-4xl">Memcards</h1>
        <Card className="mt-8">
          <CardContent className="p-6">
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
