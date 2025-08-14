import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      /** Includes default properties like name, email */
      name?: string | null;
      email?: string | null;
      image?: string | null;
      /** Add your custom properties here */
      role?: string;
      profileComplete?: boolean;
      profileStatus?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: string;
    accessToken?: string;
    profileComplete?: boolean;
    profileStatus?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    role?: string;
    profileComplete?: boolean;
    profileStatus?: string;
  }
}
