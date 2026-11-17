import { requirePermission } from '@/lib/dal';

// Guards every page under /proyek (the pages themselves are client components).
export default async function ProyekLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePermission('project:read');
  return children;
}
