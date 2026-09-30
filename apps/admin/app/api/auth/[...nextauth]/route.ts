import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { isAllowedAdminEmail } from '@/lib/admin-access';

if (process.env.ADMIN_URL) {
  process.env.NEXTAUTH_URL = process.env.ADMIN_URL;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return isAllowedAdminEmail(user.email);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
