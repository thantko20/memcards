"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

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
    <Button className="w-full mt-4" isLoading={pending}>
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
