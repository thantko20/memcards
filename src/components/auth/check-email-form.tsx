"use client";

import { checkIfEmailExistsAction } from "@/actions/auth.actions";
import {
  EmailExistsFormValues,
  EmailExistsFormSchema
} from "@/core/auth/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form
} from "../ui/form";
import { Input } from "../ui/input";
import { Alert, AlertDescription } from "../ui/alert";
import { useAction } from "next-safe-action/hook";

export const CheckEmailForm = () => {
  const form = useForm<EmailExistsFormValues>({
    resolver: zodResolver(EmailExistsFormSchema),
    defaultValues: {
      email: ""
    }
  });

  const {
    execute,
    status,
    result: { data: emailExists }
  } = useAction(checkIfEmailExistsAction);

  return (
    <Form {...form}>
      {emailExists ? (
        <Alert variant="destructive">
          <AlertDescription>Email is already taken</AlertDescription>
        </Alert>
      ) : null}
      <form
        action={async () => {
          if (await form.trigger()) {
            execute(form.getValues().email);
          }
        }}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} autoSave="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full mt-4">Continue</Button>
      </form>
    </Form>
  );
};
