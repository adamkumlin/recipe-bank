import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({

  secret: process.env.AUTH_SECRET as string,
  providers: [
    GitHub,
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
});