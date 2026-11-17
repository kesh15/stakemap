import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppBreadcrumb } from '@/components/layout/app-breadcrumb';
import { ToggleMode } from '@/components/layout/toggle-mode';
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
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className='sticky top-0 flex h-16 items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <AppBreadcrumb />
            <ToggleMode className='ml-auto' />
          </header>
          <main className='flex flex-1 flex-col gap-4 p-4'>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </AuthzProvider>
  );
}
