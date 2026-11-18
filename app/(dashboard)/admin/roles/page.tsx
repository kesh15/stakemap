import { asc, count, eq } from 'drizzle-orm';
import { db } from '@/db';
import { role, rolePermission, userRole } from '@/db/schema';
import { requireSuperAdmin } from '@/lib/dal';
import { isPermission } from '@/lib/permissions';
import { RolesManager, type RoleRow } from './roles-manager';

export default async function AdminRolesPage() {
  await requireSuperAdmin();

  const [roles, permissions] = await Promise.all([
    db
      .select({
        id: role.id,
        name: role.name,
        description: role.description,
        userCount: count(userRole.userId),
      })
      .from(role)
      .leftJoin(userRole, eq(userRole.roleId, role.id))
      .groupBy(role.id)
      .orderBy(asc(role.name)),
    db.select().from(rolePermission),
  ]);

  const byRole = new Map<string, string[]>();
  for (const { roleId, permission } of permissions) {
    if (!isPermission(permission)) continue; // stale, removed from code
    byRole.set(roleId, [...(byRole.get(roleId) ?? []), permission]);
  }

  const rows: RoleRow[] = roles.map((r) => ({
    ...r,
    permissions: byRole.get(r.id) ?? [],
  }));

  return (
    <div className='flex flex-1 flex-col gap-4 p-4 md:p-6'>
      <div>
        <h1 className='text-2xl font-bold'>Role &amp; Permission</h1>
        <p className='text-muted-foreground text-sm'>
          Buat role dan tentukan apa saja yang boleh dilakukan pemiliknya.
          Perubahan berlaku pada request berikutnya.
        </p>
      </div>
      <RolesManager roles={rows} />
    </div>
  );
}
