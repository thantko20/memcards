"use client";

import { CheckEmailForm, RegisterForm } from ".";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "../ui/card";
import { GoogleSignInButton } from "./buttons";
import { Link } from "../ui/link";
import { useSearchParams } from "next/navigation";

export const RegisterWrapper = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="max-w-md mx-auto space-y-2">
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          {!email ? (
            <CardDescription>
              You can sign up email or Google Account
            </CardDescription>
          ) : null}
        </CardHeader>
        <CardContent>
          {!email ? (
            <>
              <GoogleSignInButton method="signup" />
              <div className="flex items-center gap-2 my-4">
                <div className="h-[0.75px] bg-gray-300 dark:bg-gray-700 w-full" />
                <span className="text-sm text-gray-400">OR</span>
                <div className="h-[0.75px] bg-gray-300 dark:bg-gray-700 w-full" />
              </div>
              <CheckEmailForm />
            </>
          ) : (
            <RegisterForm email={email} />
          )}
        </CardContent>
      </Card>
      {!email ? (
        <div>
          <p className="text-sm text-center mt-4">
            <span className="text-gray-600 dark:text-gray-400">
              Already have an account?
            </span>
            <Link href="/login" className="ml-2 text-sm">
              Login
            </Link>
          </p>
        </div>
      ) : null}
    </div>
  );
};
