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
import { User } from "@/lib/db/schema";
import { useTransition } from "react";

const ProfileDropdownMenu = ({ user }: { user: User }) => {
  const { isOpen, open, close } = useDisclosure();
  const [isPending, startTransition] = useTransition();
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
                  .join("")}
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
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure to sign out?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={close}>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={() =>
                  startTransition(async () => {
                    await signOutAction();
                    close();
                  })
                }
                isLoading={isPending}
              >
                Continue
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
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
