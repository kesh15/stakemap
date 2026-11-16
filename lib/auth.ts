import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { UserRole } from '@/types/next-auth';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@stakemap.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Demo user / placeholder credentials
        // Anda dapat mengganti ini dengan pengecekan database (Drizzle ORM)
        if (
          credentials.email === 'admin@stakemap.com' &&
          credentials.password === 'admin123'
        ) {
          return {
            id: '1',
            name: 'Administrator',
            email: 'admin@stakemap.com',
            role: 'ADMIN' as UserRole,
          };
        }

        if (
          credentials.email === 'user@stakemap.com' &&
          credentials.password === 'user123'
        ) {
          return {
            id: '2',
            name: 'Standard User',
            email: 'user@stakemap.com',
            role: 'USER' as UserRole,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Jika callbackUrl mengarah kembali ke halaman signin, arahkan ke dashboard "/"
      if (url.includes('/api/auth/signin') || url === baseUrl) {
        return `${baseUrl}/`;
      }
      // Jika url relatif (contoh: "/proyek" atau "/"), gabungkan dengan baseUrl
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      // Jika url dari origin yang sama
      try {
        if (new URL(url).origin === baseUrl) {
          return url;
        }
      } catch {
        return `${baseUrl}/`;
      }
      return `${baseUrl}/`;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'stakemap_nextauth_secret_development_key',
};
