import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative grid place-items-center h-screen">
      <ThemeToggle className="absolute top-12 right-12 z-10" />
      <main className="relative z-20">{children}</main>
    </div>
  );
}
