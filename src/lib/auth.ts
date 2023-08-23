import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      async profile(profile) {
        // Fetch user's verification status from the database
        const user = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });

        if (user && user.isVerified) {
          // Allow login for verified users
          return {
            id: user.id,
            email: profile.email,
            username : profile.username,
            randomKey: "Hey cool",
          };
        } else {
          // Prevent login for unverified users
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "my-project",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const user = await prisma.user.findUnique({
          where: payload,
        });

        if (!user) {
          throw new Error("User is not registered");
        }

        if (user && !user.isVerified) {
          throw new Error("User is not verified");
        }
        // If no error and we have user data, return it
        if (user && user.isVerified) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: ({token, user}) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },

    session: ({session, token}) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    signIn(user: { isVerified: boolean }) {
      if (!user.isVerified) {
        return false; // Return false to prevent login
      }
      return true; // Allow login for verified users
    },
  },
};
