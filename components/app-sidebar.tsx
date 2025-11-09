"use client";

import * as React from "react";
import {
  Frame,
  SquareTerminal,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";

// This is sample data.
const data = {
  user: {
    name: "Rakesh Bramantyo",
    email: "designwithkesh@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  
  navMain: [
    {
      title: "Stakeholder",
      url: "/stakeholder",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Kategori Stakeholder",
          url: "/stakeholder/kategori",
        },
        {
          title: "Daftar Stakeholder",
          url: "/stakeholder/daftar",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Daftar Proyek",
      url: "/proyek",
      icon: Frame,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
