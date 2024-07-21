import prisma from "@/database/PrismaClient";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
/// next-auth/react
// 
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "SignUp",
      id: "signUp",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Your name" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "your-email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: credentials?.email },
          });

          if (existingUser) {
            throw new Error("Email already registered");
          }

          const hashedPassword = await bcrypt.hash(
            credentials?.password as string,
            10
          );
          const newUser = await prisma.user.create({
            data: {
              email: credentials?.email as string,
              password: hashedPassword,
              name: credentials?.name as string,
            },
          });

          return newUser;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
    CredentialsProvider({
      name: "SignIn",
      id: "signIn",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your-email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
          });

          if (!user) {
            throw new Error("Invalid email or password");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your email before signing in");
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials?.password as string,
            user.password
          );

          if (!isCorrectPassword) {
            throw new Error("Invalid email or password");
          }

          return user;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/newuser",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.image = user?.image;
        token.isVerified = user?.isVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.image = token?.image;
        session.user.isVerified = token?.isVerified;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET
};

