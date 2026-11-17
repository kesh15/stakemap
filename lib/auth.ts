import { betterAuth } from 'better-auth';
import { admin } from 'better-auth/plugins';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { ac, roles } from '@/lib/admin-access';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    // No public sign-up: only the super admin creates accounts.
    disableSignUp: true,
  },
  plugins: [
    admin({
      ac,
      roles,
      defaultRole: 'user',
      adminRoles: ['super_admin'],
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
