// Creates the first super admin (or promotes an existing user).
// Safe to run more than once.
//
//   npm run db:seed-admin
//
// Reads SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD, SUPER_ADMIN_NAME from .env.
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { user } from '@/db/schema';
import { auth } from '@/lib/auth';
import { SUPER_ADMIN } from '@/lib/admin-access';

async function main() {
  const email = process.env.SUPER_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.SUPER_ADMIN_PASSWORD;
  const name = process.env.SUPER_ADMIN_NAME?.trim() || 'Super Admin';

  if (!email || !password) {
    throw new Error('Set SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD in .env');
  }
  if (password.length < 8) {
    throw new Error('SUPER_ADMIN_PASSWORD must be at least 8 characters');
  }

  const existing = await db.query.user.findFirst({
    where: eq(user.email, email),
  });

  if (existing) {
    if (existing.role === SUPER_ADMIN) {
      console.log(`✔ ${email} is already super admin. Nothing to do.`);
      return;
    }
    await db
      .update(user)
      .set({ role: SUPER_ADMIN })
      .where(eq(user.id, existing.id));
    console.log(`✔ Promoted existing user ${email} to super admin.`);
    return;
  }

  // No headers → trusted server call; the admin plugin allows it without a session.
  await auth.api.createUser({
    body: { email, password, name, role: SUPER_ADMIN },
  });
  console.log(`✔ Created super admin ${email}.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('✖', err instanceof Error ? err.message : err);
    process.exit(1);
  });
