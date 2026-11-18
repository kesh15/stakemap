import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { AuthzProvider } from '@/components/providers/authz-provider';
import { getPermissions, isSuperAdmin, requireUser } from '@/lib/dal';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Real session check (proxy.ts only checks that a cookie exists).
  const session = await requireUser();
  const permissions = await getPermissions();
  const { id, name, email, image } = session.user;

  return (
    <AuthzProvider
      value={{
        user: { id, name, email, image: image ?? null },
        isSuperAdmin: isSuperAdmin(session),
        permissions: [...permissions],
      }}
    >
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
        <AppSidebar
          variant='inset'
          user={{
            name,
            email,
            avatar: image ?? '/avatars/shadcn.jpg',
          }}
        />
        <SidebarInset>
          <SiteHeader />
          <div className='flex flex-1 flex-col'>{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </AuthzProvider>
  );
}
