import NextAuth from "next-auth/next";
import prisma from "../../../../lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/sign-in",
    signUp: "/sign-up",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text", placeholder: "Student" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter an email and password");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("No user found");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }
        console.log(user)
        return {
          id: user.id,
          PRN: user.PRN,
          email: user.email,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id;
        token.PRN = user.PRN;
        token.email = user.email;
        token.role = user.role;
        token.picture = user.image;
      }
      return token;
    },
    async session({session, token}) {
      if (token) {
        session.user.id = token.id ?? session.user.id;
        session.user.PRN = token.PRN ?? session.user.PRN;
        session.user.email = token.email ?? session.user.email;
        session.user.role = token.role ?? session.user.role;
        session.user.image = token.picture ?? session.user.image;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
