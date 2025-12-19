import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ profile }) {
      if (!process.env.ALLOWED_EMAIL) {
        return false;
      }
      if (profile?.email == process.env.ALLOWED_EMAIL) {
        return true;
      } else {
        return false;
      }
    },
  },
});
