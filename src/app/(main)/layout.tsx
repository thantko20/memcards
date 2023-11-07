import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex">
      <div className="h-full w-32 bg-primary" />
      <main>{children}</main>
    </div>
  );
}
