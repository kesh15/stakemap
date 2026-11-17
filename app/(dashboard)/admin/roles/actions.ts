'use server';

// Same pattern as admin/users/actions.ts: guard outside try, zod, work, revalidate.
import { revalidatePath } from 'next/cache';
import { count, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '@/db';
import { role, rolePermission, userRole } from '@/db/schema';
import { requireSuperAdmin } from '@/lib/dal';
import { isPermission } from '@/lib/permissions';
import { type ActionResult, toErrorMessage } from '@/lib/action-result';

function revalidate() {
  revalidatePath('/admin/roles');
  revalidatePath('/admin/users'); // shows role names
}

const roleFields = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Nama role wajib diisi.')
    .max(50, 'Nama role maksimal 50 karakter.'),
  description: z
    .string()
    .trim()
    .max(200, 'Deskripsi maksimal 200 karakter.')
    .transform((v) => v || null),
});

const permissionList = z
  .array(z.string())
  .refine((list) => list.every(isPermission), 'Permission tidak dikenal.')
  .transform((list) => [...new Set(list)]);

function message(err: unknown) {
  const msg = toErrorMessage(err);
  return msg === 'Nama sudah dipakai.' ? 'Nama role sudah dipakai.' : msg;
}

export async function createRoleAction(input: {
  name: string;
  description: string;
}): Promise<ActionResult<{ id: string }>> {
  await requireSuperAdmin();
  try {
    const data = roleFields.parse(input);
    const [created] = await db
      .insert(role)
      .values(data)
      .returning({ id: role.id });
    revalidate();
    return { ok: true, data: { id: created.id } };
  } catch (err) {
    return { ok: false, error: message(err) };
  }
}

export async function updateRoleAction(
  roleId: string,
  input: { name: string; description: string; permissions: string[] }
): Promise<ActionResult> {
  await requireSuperAdmin();
  try {
    z.string().min(1).parse(roleId);
    const data = roleFields.parse(input);
    const permissions = permissionList.parse(input.permissions);

    await db.transaction(async (tx) => {
      const [updated] = await tx
        .update(role)
        .set(data)
        .where(eq(role.id, roleId))
        .returning({ id: role.id });
      if (!updated) throw new Error('ROLE_NOT_FOUND');

      // Replace the whole set: simpler than diffing, and atomic.
      await tx.delete(rolePermission).where(eq(rolePermission.roleId, roleId));
      if (permissions.length > 0) {
        await tx
          .insert(rolePermission)
          .values(permissions.map((permission) => ({ roleId, permission })));
      }
    });
    revalidate();
    return { ok: true };
  } catch (err) {
    if (err instanceof Error && err.message === 'ROLE_NOT_FOUND') {
      return { ok: false, error: 'Role tidak ditemukan.' };
    }
    return { ok: false, error: message(err) };
  }
}

export async function deleteRoleAction(roleId: string): Promise<ActionResult> {
  await requireSuperAdmin();
  try {
    z.string().min(1).parse(roleId);
    const [{ users }] = await db
      .select({ users: count() })
      .from(userRole)
      .where(eq(userRole.roleId, roleId));
    if (users > 0) {
      return {
        ok: false,
        error: `Role masih dipakai ${users} pengguna. Pindahkan mereka ke role lain dulu.`,
      };
    }
    // role_permission rows cascade.
    await db.delete(role).where(eq(role.id, roleId));
    revalidate();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: message(err) };
  }
}
