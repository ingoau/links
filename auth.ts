import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      // GitHub now sends `iss` on the callback (RFC 9207); without this
      // Auth.js compares it against its placeholder issuer and rejects login.
      issuer: "https://github.com/login/oauth",
    }),
  ],
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
