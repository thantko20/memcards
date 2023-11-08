import { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log(auth?.user);
      const isLoggedIn = !!auth?.user;
      const isOnAuthPages =
        nextUrl.pathname === "/login" || nextUrl.pathname === "/register";

      if (isLoggedIn && isOnAuthPages) {
        return Response.redirect(new URL("/demo", nextUrl));
      }

      if (isOnAuthPages) {
        return true;
      }

      return isLoggedIn;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session = { ...session, user: { ...session.user, id: token.sub } };
      }
      return session;
    }
  }
} satisfies NextAuthConfig;
