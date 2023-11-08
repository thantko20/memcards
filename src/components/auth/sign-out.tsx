import { signOutAction } from "@/actions/auth.actions";
import { SignOutButton } from "./buttons";

export const SignOut = () => {
  return (
    <form action={signOutAction}>
      <SignOutButton />
    </form>
  );
};
