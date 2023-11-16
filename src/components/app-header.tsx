"use client";

import { signOutAction } from "@/actions/auth.actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useDisclosure } from "@/hooks";
import { useModalState } from "@/hooks/useModalState";
import { User } from "@/lib/db/schema";
import { useFormStatus } from "react-dom";

const SignOutButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button isLoading={pending} type="submit">
      Continue
    </Button>
  );
};

const ProfileDropdownMenu = ({ user }: { user: User }) => {
  const { isOpen, onChange, open } = useDisclosure();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="py-6">
            <Avatar>
              <AvatarImage src={user.avatar ?? ""} alt="user avatar" />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((name) => name[0].toUpperCase())
                  .join("")
                  .substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {user.name}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[200px]" align="end">
          <DropdownMenuItem onClick={open}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={isOpen} onOpenChange={onChange}>
        <AlertDialogContent>
          <form action={signOutAction}>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure to sign out?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <SignOutButton />
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export const Header = ({ user }: { user?: User }) => {
  return (
    <>
      <div className="flex items-center justify-between px-2 py-4">
        <span>Logo</span>
        <div className="flex items-center gap-4">
          {user ? <ProfileDropdownMenu user={user} /> : null}
          <ThemeToggle />
        </div>
      </div>
    </>
  );
};
