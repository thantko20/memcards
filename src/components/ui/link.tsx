import { cn } from "@/utils/ui";
import NextLink from "next/link";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { buttonVariants } from "./button";

interface LinkProps extends ComponentPropsWithoutRef<typeof NextLink> {}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <NextLink
        ref={ref}
        className={cn(
          buttonVariants({ variant: "link" }),
          "p-0 text-base h-max",
          className
        )}
        {...props}
      >
        {children}
      </NextLink>
    );
  }
);

Link.displayName = "Link";
