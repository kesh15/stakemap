import { requireSuperAdmin } from '@/lib/dal';

// Everything under /admin is super admin only.
// Server actions used by these pages must call requireSuperAdmin() too.
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireSuperAdmin();
  return children;
}
