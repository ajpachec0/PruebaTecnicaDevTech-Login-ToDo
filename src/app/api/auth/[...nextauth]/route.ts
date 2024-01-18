import { connectDB } from "@/database/mongodb";
import User from "@/models/user.model";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        await connectDB();
        console.log(credentials);

        const userFound = await User.findOne({ email: credentials?.email });

        if (!userFound) throw new Error("Invalid Credentials");

        const validatePassword = await bcrypt.compare(
          credentials!.password,
          userFound.password
        );

        if (!validatePassword) throw new Error("Invalid Credentials Password");

        console.log(userFound);

        return userFound;
      },
    }),
  ],

  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (user) token.user = user;

      return token;
    },

    session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
