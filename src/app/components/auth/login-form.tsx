"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { LoginFormValues, LoginSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "../ui/alert";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form
} from "../ui/form";
import { Input } from "../ui/input";
import { signInWithCredentials } from "@/app/actions/auth.actions";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full mt-4" isLoading={pending}>
      Login
    </Button>
  );
};

export const LoginForm = () => {
  const [state, action] = useFormState(signInWithCredentials, null);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

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
