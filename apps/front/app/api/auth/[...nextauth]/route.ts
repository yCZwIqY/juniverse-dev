import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

if (process.env.FRONT_URL) {
  process.env.NEXTAUTH_URL = process.env.FRONT_URL;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
