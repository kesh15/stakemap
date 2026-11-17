'use server';

// Every action: 1) requireSuperAdmin() OUTSIDE try (its redirect must not be
// swallowed), 2) validate input with zod, 3) do the work, 4) revalidate.
// auth.api.* calls get the request headers, so Better Auth's admin plugin
// re-checks the super admin session on its side too.
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '@/db';
import { role, user, userRole } from '@/db/schema';
import { auth } from '@/lib/auth';
import { SUPER_ADMIN } from '@/lib/admin-access';
import { requireSuperAdmin } from '@/lib/dal';
import { type ActionResult, toErrorMessage } from '@/lib/action-result';

const PATH = '/admin/users';

const id = z.string().min(1);
const roleId = z.string().min(1).nullable();
const password = z
  .string()
  .min(8, 'Password minimal 8 karakter.')
  .max(128, 'Password maksimal 128 karakter.');

/** Super admin can't act on themselves or on other super admins (seed only). */
async function assertManageable(currentUserId: string, targetId: string) {
  if (targetId === currentUserId) {
    throw new Error('SELF');
  }
  const target = await db.query.user.findFirst({
    where: eq(user.id, targetId),
  });
  if (!target) throw new Error('NOT_FOUND');
  if (target.role === SUPER_ADMIN) throw new Error('SUPER_ADMIN');
}

async function assertRoleExists(id: string | null) {
  if (!id) return;
  const found = await db.query.role.findFirst({ where: eq(role.id, id) });
  if (!found) throw new Error('ROLE_NOT_FOUND');
}

function message(err: unknown) {
  if (err instanceof Error) {
    switch (err.message) {
      case 'SELF':
        return 'Kamu tidak bisa mengubah akunmu sendiri di sini.';
      case 'NOT_FOUND':
        return 'Pengguna tidak ditemukan.';
      case 'SUPER_ADMIN':
        return 'Akun super admin hanya bisa dikelola lewat seed.';
      case 'ROLE_NOT_FOUND':
        return 'Role tidak ditemukan.';
    }
  }
  return toErrorMessage(err);
}

export async function createUserAction(input: {
  name: string;
  email: string;
  password: string;
  roleId: string | null;
}): Promise<ActionResult> {
  await requireSuperAdmin();
  try {
    const data = z
      .object({
        name: z.string().trim().min(1, 'Nama wajib diisi.'),
        email: z.email('Format email tidak valid.'),
        password,
        roleId,
      })
      .parse(input);
    await assertRoleExists(data.roleId);

    const { user: created } = await auth.api.createUser({
      body: { name: data.name, email: data.email, password: data.password },
      headers: await headers(),
    });
    if (data.roleId) {
      await db
        .insert(userRole)
        .values({ userId: created.id, roleId: data.roleId });
    }
    revalidatePath(PATH);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: message(err) };
  }
}

export async function setUserRoleAction(
  userId: string,
  newRoleId: string | null
): Promise<ActionResult> {
  const session = await requireSuperAdmin();
  try {
    id.parse(userId);
    roleId.parse(newRoleId);
    await assertManageable(session.user.id, userId);
    await assertRoleExists(newRoleId);

    if (newRoleId) {
      await db
        .insert(userRole)
        .values({ userId, roleId: newRoleId })
        .onConflictDoUpdate({
          target: userRole.userId,
          set: { roleId: newRoleId },
        });
    } else {
      await db.delete(userRole).where(eq(userRole.userId, userId));
    }
    revalidatePath(PATH);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: message(err) };
  }
}

export async function banUserAction(
  userId: string,
  reason?: string
): Promise<ActionResult> {
  const session = await requireSuperAdmin();
  try {
    id.parse(userId);
    await assertManageable(session.user.id, userId);
    // Also deletes all of the user's sessions → logged out immediately.
    await auth.api.banUser({
      body: { userId, banReason: reason?.trim() || undefined },
      headers: await headers(),
    });
    revalidatePath(PATH);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: message(err) };
  }
}

export async function unbanUserAction(userId: string): Promise<ActionResult> {
  const session = await requireSuperAdmin();
  try {
    id.parse(userId);
    await assertManageable(session.user.id, userId);
    await auth.api.unbanUser({ body: { userId }, headers: await headers() });
    revalidatePath(PATH);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: message(err) };
  }
}

export async function resetPasswordAction(
  userId: string,
  newPassword: string
): Promise<ActionResult> {
  const session = await requireSuperAdmin();
  try {
    id.parse(userId);
    password.parse(newPassword);
    await assertManageable(session.user.id, userId);
    const h = await headers();
    await auth.api.setUserPassword({
      body: { userId, newPassword },
      headers: h,
    });
    // Force re-login with the new password everywhere.
    await auth.api.revokeUserSessions({ body: { userId }, headers: h });
    revalidatePath(PATH);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: message(err) };
  }
}

export async function deleteUserAction(userId: string): Promise<ActionResult> {
  const session = await requireSuperAdmin();
  try {
    id.parse(userId);
    await assertManageable(session.user.id, userId);
    // Cascades to session, account and user_role.
    await auth.api.removeUser({ body: { userId }, headers: await headers() });
    revalidatePath(PATH);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: message(err) };
  }
}
