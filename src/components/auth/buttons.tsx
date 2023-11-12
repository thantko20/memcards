"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import Image from "next/image";

export const SignOutButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" isLoading={pending}>
      Sign Out
    </Button>
  );
};

export const LoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full mt-4" isLoading={pending} form="login-form">
      Login
    </Button>
  );
};

export const RegisterButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full mt-8" isLoading={pending}>
      Login
    </Button>
  );
};

export const GoogleSignInButton = ({
  method = "signin"
}: {
  method?: "signin" | "signup";
}) => {
  const text =
    method === "signin" ? "Continue with Google" : "Sign up with Google";
  return (
    <form action="/api/auth/google">
      <Button
        type="submit"
        variant="outline"
        className="w-full"
        leftSection={
          <Image
            src="/images/google_logo.png"
            width={16}
            height={16}
            alt="google logo"
          />
        }
      >
        {text}
      </Button>
    </form>
  );
};
