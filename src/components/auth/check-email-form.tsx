"use client";

import { checkIfEmailExistsAction } from "@/actions/auth.actions";
import {
  EmailExistsFormValues,
  EmailExistsFormSchema
} from "@/core/auth/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
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
import { useActionForm } from "@/hooks/useActionForm";

const CheckEmailButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending} className="w-full mt-4">
      Continue
    </Button>
  );
};

export const CheckEmailForm = () => {
  const { state, action } = useActionForm(checkIfEmailExistsAction);

  const form = useForm<EmailExistsFormValues>({
    resolver: zodResolver(EmailExistsFormSchema),
    defaultValues: {
      email: ""
    }
  });

  return (
    <Form {...form}>
      {state?.data ? (
        <Alert variant="destructive">
          <AlertDescription>Email is already taken</AlertDescription>
        </Alert>
      ) : null}
      <form
        action={async () => {
          const isValid = await form.trigger();
          if (!isValid) return;
          action(form.getValues().email);
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
        <CheckEmailButton />
      </form>
    </Form>
  );
};
