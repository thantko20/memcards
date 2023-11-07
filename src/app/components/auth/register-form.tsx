"use client";

import { registerAction } from "@/app/register/actions";
import { ReactNode, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValues, RegisterSchema } from "@/validations/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";

const FieldWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending} className="mt-8 w-full">
      Register
    </Button>
  );
};

export const RegisterForm = () => {
  const [state, action] = useFormState(registerAction, null);
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
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
    <div className="max-w-md mx-auto space-y-2">
      {state?.message ? (
        <Alert variant="destructive">
          <AlertDescription>{state?.message}</AlertDescription>
        </Alert>
      ) : null}
      <Form {...form}>
        <form
          action={async () => {
            const valid = await form.trigger();
            if (!valid) return;
            action(form.getValues());
          }}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johhndoe@mail.com"
                    {...field}
                    autoSave="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="off" />
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
                  <Input placeholder="John Doe" {...field} autoComplete="off" />
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
                  <Input type="password" {...field} autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton />
        </form>
      </Form>
    </div>
  );
};
