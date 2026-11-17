import { requirePermission } from '@/lib/dal';

// Guards every page under /stakeholder (the pages themselves are client components).
export default async function StakeholderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePermission('stakeholder:read');
  return children;
}
