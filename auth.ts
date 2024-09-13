import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { redirect } from "next/navigation";
import { getUserById } from "./actions/user/user-data";
import authConfig from "./auth.config";
import { db } from "./lib/db";
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        const existingUser = await getUserById(user.id!);
        if (!existingUser?.username) {
          return redirect("/");
        }
      }
      return true;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
