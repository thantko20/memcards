import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="grid place-items-center h-screen">{children}</div>;
}
