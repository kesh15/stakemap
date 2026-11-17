import { asc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { role, user, userRole } from '@/db/schema';
import { SUPER_ADMIN } from '@/lib/admin-access';
import { requireSuperAdmin } from '@/lib/dal';
import { UsersTable, type UserRow } from './users-table';

export default async function AdminUsersPage() {
  const session = await requireSuperAdmin();

  const [rows, roles] = await Promise.all([
    db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        accountRole: user.role,
        banned: user.banned,
        roleId: userRole.roleId,
        roleName: role.name,
      })
      .from(user)
      .leftJoin(userRole, eq(userRole.userId, user.id))
      .leftJoin(role, eq(role.id, userRole.roleId))
      .orderBy(asc(user.createdAt)),
    db
      .select({ id: role.id, name: role.name })
      .from(role)
      .orderBy(asc(role.name)),
  ]);

  const users: UserRow[] = rows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    isSuperAdmin: r.accountRole === SUPER_ADMIN,
    banned: !!r.banned,
    roleId: r.roleId,
    roleName: r.roleName,
  }));

  return (
    <div className='flex flex-col gap-4'>
      <div>
        <h1 className='text-2xl font-bold'>Pengguna</h1>
        <p className='text-muted-foreground text-sm'>
          Buat akun, atur role, dan blokir akses pengguna.
        </p>
      </div>
      <UsersTable users={users} roles={roles} currentUserId={session.user.id} />
    </div>
  );
}
