"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { LoginFormValues, LoginSchema } from "@/core/auth/auth.validation";
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
import { signInWithCredentialsAction } from "@/actions/auth.actions";
import { GoogleSignInButton, LoginButton } from "./buttons";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "../ui/card";
import { Link } from "../ui/link";
import Image from "next/image";

export const LoginForm = () => {
  const [state, action] = useFormState(signInWithCredentialsAction, null);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  return (
    <div className="max-w-md mx-auto space-y-2">
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Log in with email or via Google</CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleSignInButton method="signin" />
          <div className="flex items-center gap-2 my-4">
            <div className="h-[0.75px] bg-gray-300 dark:bg-gray-700 w-full" />
            <span className="text-sm text-gray-400">OR</span>
            <div className="h-[0.75px] bg-gray-300 dark:bg-gray-700 w-full" />
          </div>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email"
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
              <LoginButton />
            </form>
          </Form>
        </CardContent>
      </Card>
      <div>
        <p className="text-sm text-center mt-4">
          <span className="text-gray-600 dark:text-gray-400">
            Do not have an account?
          </span>
          <Link href="/register" className="ml-2 text-sm">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
