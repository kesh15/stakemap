'use client';

import * as React from 'react';
import { Frame, KeyRound, LayoutDashboard, SquareTerminal, Users } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavMain } from './nav-main';
import { NavProjects } from './nav-projects';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';
import { useAuthz } from '@/components/providers/authz-provider';
import type { Permission } from '@/lib/permissions';

const platformMenu = [
  {
    name: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
  },
];

// Each entry declares the permission needed to SEE it. Hiding is cosmetic;
// pages and APIs enforce the same permission on the server.
const navMain: {
  title: string;
  url: string;
  icon: typeof SquareTerminal;
  isActive?: boolean;
  permission: Permission;
  items: { title: string; url: string }[];
}[] = [
  {
    title: 'Stakeholder',
    url: '/stakeholder',
    icon: SquareTerminal,
    isActive: true,
    permission: 'stakeholder:read',
    items: [
      { title: 'Kategori Stakeholder', url: '/stakeholder/kategori' },
      { title: 'Daftar Stakeholder', url: '/stakeholder/daftar' },
    ],
  },
];

const projects: {
  name: string;
  url: string;
  icon: typeof Frame;
  permission: Permission;
}[] = [
  {
    name: 'Daftar Proyek',
    url: '/proyek',
    icon: Frame,
    permission: 'project:read',
  },
];

const adminMenu = [
  { name: 'Pengguna', url: '/admin/users', icon: Users },
  { name: 'Role & Permission', url: '/admin/roles', icon: KeyRound },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isSuperAdmin, can } = useAuthz();
  const visibleMain = navMain.filter((item) => can(item.permission));
  const visibleProjects = projects.filter((item) => can(item.permission));

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects label='Platform' projects={platformMenu} />
        {visibleMain.length > 0 && <NavMain items={visibleMain} />}
        {visibleProjects.length > 0 && (
          <NavProjects projects={visibleProjects} />
        )}
        {isSuperAdmin && <NavProjects label='Admin' projects={adminMenu} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user.name,
            email: user.email,
            avatar: user.image ?? '',
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
