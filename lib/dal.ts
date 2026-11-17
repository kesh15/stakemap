// Data Access Layer: every server-side "who are you / are you allowed" check
// goes through here. Call a guard on the first line of every protected page,
// server action and API route. Don't wrap guards in a catch-all try/catch:
// redirect() works by throwing.
import 'server-only';
import { cache } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { rolePermission, userRole } from '@/db/schema';
import { auth, type Session } from '@/lib/auth';
import { SUPER_ADMIN } from '@/lib/admin-access';
import {
  ALL_PERMISSIONS,
  isPermission,
  type Permission,
} from '@/lib/permissions';

/** Current session or null. One DB lookup per request (React cache). */
export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() })
);

export function isSuperAdmin(session: Session | null) {
  return session?.user.role === SUPER_ADMIN;
}

/** Permissions of the current user. One query per request (React cache). */
export const getPermissions = cache(async (): Promise<Set<Permission>> => {
  const session = await getSession();
  if (!session) return new Set();

  // Never read from the role tables, so a broken role can't lock them out.
  if (isSuperAdmin(session)) return new Set(ALL_PERMISSIONS);

  const rows = await db
    .select({ permission: rolePermission.permission })
    .from(userRole)
    .innerJoin(rolePermission, eq(rolePermission.roleId, userRole.roleId))
    .where(eq(userRole.userId, session.user.id));

  // Ignore stale permissions that were removed from lib/permissions.ts.
  return new Set(rows.map((r) => r.permission).filter(isPermission));
});

// ---- Pages & server actions: redirect on failure ---------------------------

export async function requireUser() {
  const session = await getSession();
  if (!session) redirect('/login');
  return session;
}

export async function requireSuperAdmin() {
  const session = await requireUser();
  if (!isSuperAdmin(session)) redirect('/forbidden');
  return session;
}

export async function requirePermission(permission: Permission) {
  const session = await requireUser();
  if (!(await getPermissions()).has(permission)) redirect('/forbidden');
  return session;
}

// ---- API route handlers: return 401 / 403 ----------------------------------

type GuardResult =
  | { session: Session; error?: never }
  | { session?: never; error: NextResponse };

export async function guardApi(permission?: Permission): Promise<GuardResult> {
  const session = await getSession();
  if (!session) {
    return {
      error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }
  if (permission && !(await getPermissions()).has(permission)) {
    return {
      error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
    };
  }
  return { session };
}
