import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import { v4 as uuidv4 } from "uuid";
import { getUserById } from "./actions/user/user-data";
import authConfig from "./auth.config";
import { db } from "./lib/db";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role: string;
      id: string;
      username: string;
      workspaceId: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/signin",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
    async createUser({ user }) {
      if (user && user.email) {
        const baseUsername = user.email.split("@")[0];
        const uniqueIdentifier = uuidv4().slice(0, 8); // Use the first 8 characters of a UUID
        const uniqueUsername = `${baseUsername}-${uniqueIdentifier}`;
        await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            username: uniqueUsername,
          },
        });
      }
    },
  },

  callbacks: {
    async session({ token, session, trigger, newSession }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        // session.user.role = token.role as UserRole;
      }
      if (token.username && session.user) {
        session.user.username = token.username as string;
      }
      if (token.workspaceId && session.user) {
        session.user.workspaceId = token.workspaceId as string;
      }

      return session;
    },

    async jwt({ token, trigger, session }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const { id, name, username, email, image } = existingUser;

      token.name = name;
      token.username = username;

      if (session?.workspaceId) token.workspaceId = session.workspaceId;

      if (trigger === "update" && session.username) {
        token.username = session.username;
      }
      if (trigger === "update" && session.workspaceId) {
        token.workspaceId = session.workspaceId;
      }

      return token;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
