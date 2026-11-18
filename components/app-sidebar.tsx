"use client"

import * as React from "react"
import {
  IconDashboard,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconKey,
  IconSettings,
  IconUserCheck,
  IconUsers,
} from "@tabler/icons-react"

import { NavMain, type NavItem } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { useAuthz } from "@/components/providers/authz-provider"
import type { Permission } from "@/lib/permissions"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type PermNavItem = NavItem & {
  permission?: Permission
}

const navMain: PermNavItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: IconDashboard,
  },
  {
    title: "Proyek",
    url: "/proyek",
    icon: IconFolder,
    permission: "project:read",
  },
  {
    title: "Stakeholder",
    url: "/stakeholder",
    icon: IconUsers,
    isActive: true,
    permission: "stakeholder:read",
    items: [
      {
        title: "Daftar Stakeholder",
        url: "/stakeholder/daftar",
      },
      {
        title: "Kategori Stakeholder",
        url: "/stakeholder/kategori",
      },
    ],
  },
]

const adminMenu: NavItem[] = [
  {
    title: "Pengguna",
    url: "/admin/users",
    icon: IconUserCheck,
  },
  {
    title: "Role & Permission",
    url: "/admin/roles",
    icon: IconKey,
  },
]

const navSecondary = [
  {
    title: "Settings",
    url: "#",
    icon: IconSettings,
  },
  {
    title: "Get Help",
    url: "#",
    icon: IconHelp,
  },
]

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user?: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { user: authUser, isSuperAdmin, can } = useAuthz()
  const currentUser = user ?? {
    name: authUser.name,
    email: authUser.email,
    avatar: authUser.image ?? "/avatars/shadcn.jpg",
  }

  const visibleNav = navMain.filter(
    (item) => !item.permission || can(item.permission)
  )

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">Stakemap</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={visibleNav} showQuickCreate />
        {isSuperAdmin && <NavMain items={adminMenu} label="Admin" />}
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
