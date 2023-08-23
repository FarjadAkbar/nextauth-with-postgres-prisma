import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare, hash } from "bcryptjs";
import type { Account, Profile, NextAuthOptions } from "next-auth";
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
          const hashed_password = await hash(profile.azp, 12);
          const res = await prisma.user.create({
            data: {
              username: profile.name,
                    email: profile.email,
                    password: hashed_password,
            },
          });
        }
        if (user && user.isVerified === false) {
          throw new Error("Admin not verified this account");
        }

        return {
          id: profile.id, // Convert the id to a string
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
    async signIn({ account, profile }: { account: Account | null; profile?: Profile }): Promise<string | boolean> {
      if (account?.provider === "google") {
        console.log(profile, "profile");
        return profile?.email && profile?.email.endsWith("@example.com") ? true : "Email verification failed";
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },

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
