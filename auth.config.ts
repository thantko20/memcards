import { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  providers: [],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log(auth?.user);
      if (isLoggedIn && nextUrl.pathname !== "/") {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    }
  }
};
