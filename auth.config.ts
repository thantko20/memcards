import { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  providers: [],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    authorized() {
      return true;
    }
  }
};
