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
import { LoginButton } from "./buttons";
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
          <CardDescription>
            Log in with email and password or via Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action="/api/auth/google">
            <Button
              type="submit"
              className="w-full bg-red-500 mb-2 hover:bg-red-600"
            >
              Continue with Google
            </Button>
          </form>
          <div className="flex items-center gap-2">
            <div className="h-[1px] bg-gray-300 dark:bg-gray-700 w-full" />
            <span className="text-sm text-gray-400">OR</span>
            <div className="h-[1px] bg-gray-300 dark:bg-gray-700 w-full" />
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
              <div>
                <p>
                  Do not have an account?
                  <Link href="/register" className="ml-2">
                    Register
                  </Link>
                </p>
              </div>
              <LoginButton />
            </form>
          </Form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};
