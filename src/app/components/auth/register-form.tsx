"use client";

import { Input } from "../ui/input";

export const RegisterForm = () => {
  return (
    <form className="max-w-md mx-auto">
      <Input name="email" />
      <Input name="password" type="password" />
    </form>
  );
};
