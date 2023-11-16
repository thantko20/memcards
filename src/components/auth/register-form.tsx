"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
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
import { useActionForm } from "@/hooks/useActionForm";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending} className="mt-8 w-full">
      Sign Up
    </Button>
  );
};

export const RegisterForm = ({ email }: { email?: string }) => {
  const { state, action } = useActionForm(registerAction);
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email,
      name: "",
      password: "",
      username: ""
    }
  });

  useEffect(() => {
    if (state === null) {
      form.reset();
    }
  }, [state, form]);

  return (
    <Form {...form}>
      {state?.message ? (
        <Alert variant="destructive">
          <AlertDescription>{state?.message}</AlertDescription>
        </Alert>
      ) : null}
      <form
        id="login-form"
        action={async () => {
          const valid = await form.trigger();
          if (!valid) return;
          action(form.getValues());
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
        <SubmitButton />
      </form>
    </Form>
  );
};
