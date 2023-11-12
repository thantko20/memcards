import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[500px] mx-auto pt-12">
      <ThemeToggle className="absolute top-4 right-4 md:top-12 md:right-12 z-30" />
      <main className="relative z-20 px-2">{children}</main>
    </div>
  );
}
