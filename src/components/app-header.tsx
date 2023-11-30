"use client";

import { signOutAction } from "@/actions/auth.actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useDisclosure } from "@/hooks";
import { User } from "@/lib/db/schema";
import { useAction } from "next-safe-action/hook";
import { toast } from "./ui/use-toast";
import { Link } from "./ui/link";
import NextLink from "next/link";
import { Logo } from "./logo";
import { ReactNode } from "react";

const ProfileDropdownMenu = ({ user }: { user: User }) => {
  const { isOpen, onChange, open } = useDisclosure();
  const { execute, status } = useAction(signOutAction, {
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error.serverError ?? "Something went wrong!",
      });
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-2">
            <Avatar className="w-9 h-9">
              <AvatarImage src={user.avatar ?? ""} alt="user avatar" />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((name) => name[0].toUpperCase())
                  .join("")
                  .substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[200px]" align="end">
          <DropdownMenuItem onClick={open}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={isOpen} onOpenChange={onChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure to sign out?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              isLoading={status === "executing"}
              onClick={() => execute(undefined)}
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className="text-sm hover:no-underline text-gray-600 hover:text-gray-900 dark:hover:text-gray-50 dark:text-gray-400"
    >
      {children}
    </Link>
  );
};

export const Header = ({ user }: { user?: User }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between px-2 py-4 max-w-5xl mx-auto">
        <div className="flex gap-10 items-center">
          <NextLink href="/app">
            <Logo />
          </NextLink>
          <nav>
            <ul className="flex gap-6 items-center">
              <li>
                <NavLink href="/app">My Decks</NavLink>
              </li>
              <li>
                <NavLink href="/app/explore">Explore</NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {user ? <ProfileDropdownMenu user={user} /> : null}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};
