'use client';

import * as React from 'react';
import { Frame, SquareTerminal } from 'lucide-react';

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
import { useSession } from '@/lib/auth-client';

// This is sample data.
const data = {
  user: {
    name: 'Rakesh Bramantyo',
    email: 'designwithkesh@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },

  navMain: [
    {
      title: 'Stakeholder',
      url: '/stakeholder',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'Kategori Stakeholder',
          url: '/stakeholder/kategori',
        },
        {
          title: 'Daftar Stakeholder',
          url: '/stakeholder/daftar',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Daftar Proyek',
      url: '/proyek',
      icon: Frame,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const currentUser = session?.user
    ? {
        name: session.user.name || 'User',
        email: session.user.email || '',
        avatar: session.user.image || '/avatars/shadcn.jpg',
      }
    : data.user;

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
