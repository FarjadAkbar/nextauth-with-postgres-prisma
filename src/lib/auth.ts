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
        const user = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });
        
        if(!user){
          const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({
              username: profile.name,
              email: profile.email,
              role: profile.role,
              isVerified: 0
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
        if (user && user.isVerified === false) {
          throw new Error("Admin not verified this account");
        }

        return {
          id: profile.id.toString(), // Convert the id to a string
          email: profile.email,
          username: profile.name,
          randomKey: "Hey cool",
        };
      }
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          throw new Error("Email is required");
        }
      
        if (!credentials.password) {
          throw new Error("Password is required");
        }
      
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
      

        if (!user || !(await compare(credentials.password, user.password!))) {
          throw new Error("Invalid Credential");
        }
      
        
        if (user && user.isVerified === false) {
          throw new Error("Admin not verified this account");
        }

        return {
          id: user.id.toString(), // Convert the id to a string
          email: user.email,
          username: user.username,
          randomKey: "Hey cool",
        };
      }
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
  },
};
