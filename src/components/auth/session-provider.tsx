import { User } from "@/lib/db/schema";
import { ReactNode, createContext } from "react";

type SessionContext = {
  user: User | null;
};

export const sessionContext = createContext<SessionContext>({ user: null });

export const SessionProvider = ({ children }: { children: ReactNode }) => {};
