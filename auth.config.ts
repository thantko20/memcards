import { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAuthPages =
        nextUrl.pathname === "/login" || nextUrl.pathname === "/register";

      if (isLoggedIn && isOnAuthPages) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return isLoggedIn;
    }
  }
} satisfies NextAuthConfig;
