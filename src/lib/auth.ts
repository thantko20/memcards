import { z } from "zod";
import NextAuth from "next-auth";
import { authConfig } from "../../auth.config";
import Credentials from "next-auth/providers/credentials";
import { AuthService } from "@/domain/auth/auth.service";

export const { signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const result = z
          .object({
            email: z.string().email(),
            password: z.string().min(6)
          })
          .safeParse(credentials);

        if (result.success) {
          return await AuthService.loginWithCredentials(result.data);
        }
        return null;
      }
    })
  ]
});
