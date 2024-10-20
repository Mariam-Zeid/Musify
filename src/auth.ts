import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";

import { prisma } from "@/server/db";
import { getUserById } from "@/server/data/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  events: {
    async linkAccount({ user }) {
      //Mark email as verified when linking an account (e.g., OAuth provider)
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      // prevent sign in without email verification
      const existingUser = await getUserById(user.id ?? "");
      if (!existingUser?.emailVerified) return false;

      return true;
    },

    // Extra properties to return with session
    async session({ token, session }) {
      // adding user id to session
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      // adding new properties
      if (session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email!;
        session.user.image = token.image as string;
        session.user.role = token.role as UserRole;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.image = existingUser.image;
      token.role = existingUser.role;

      return token;
    },
  },

  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
