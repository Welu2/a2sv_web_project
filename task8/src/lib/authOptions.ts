// lib/authOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import axios from "axios";

const baseUrl = "https://akil-backend.onrender.com";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(`${baseUrl}/login`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          const userData = res.data.data;

          if (res.data.success && userData?.accessToken) {
            return {
              id: userData.id,
              name: userData.name,
              email: userData.email,
              accessToken: userData.accessToken,
              role: userData.role,
              profileComplete: userData.profileComplete,
              profileStatus: userData.profileStatus,
            };
          }
          return null;
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
