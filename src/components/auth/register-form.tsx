"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormValues,
  RegisterSchema
} from "@/core/auth/auth.validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { registerAction } from "@/actions/auth.actions";
import { useAction } from "next-safe-action/hook";

export const RegisterForm = ({ email }: { email?: string }) => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email,
      name: "",
      password: "",
      username: ""
    }
  });
  const { execute, status, result } = useAction(registerAction, {
    onSuccess: () => {
      form.reset();
    }
  });

  return (
    <Form {...form}>
      {result.serverError ? (
        <Alert variant="destructive">
          <AlertDescription>{result.serverError}</AlertDescription>
        </Alert>
      ) : null}
      <form
        id="login-form"
        action={async () => {
          if (await form.trigger()) {
            execute(form.getValues());
          }
        }}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  autoComplete="off"
                  placeholder="Enter username"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  autoComplete="off"
                  placeholder="Enter your name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  autoComplete="off"
                  placeholder="Enter password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button isLoading={status === "executing"} className="mt-8 w-full">
          Sign Up
        </Button>
      </form>
    </Form>
  );
};
