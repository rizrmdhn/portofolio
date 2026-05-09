import {
  IconActivity,
  IconBriefcase,
  IconBuildingCommunity,
  IconCertificate,
  IconFolder,
  IconHome,
  IconSettings,
  IconStack2,
} from "@tabler/icons-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { User } from "better-auth";
import { ModeToggle } from "../mode-toggle";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const navGroups = [
  {
    title: "Home",
    items: [
      { name: "Overview", icon: IconHome, url: "/dashboard", exact: true },
      { name: "Activity", icon: IconActivity, url: "/dashboard/activity" },
    ],
  },
  {
    title: "Content",
    items: [
      { name: "Projects", icon: IconFolder, url: "/dashboard/projects" },
      { name: "Experience", icon: IconBriefcase, url: "/dashboard/experience" },
      { name: "Tech Stack", icon: IconStack2, url: "/dashboard/tech-stack" },
      {
        name: "Certificate",
        icon: IconCertificate,
        url: "/dashboard/certificate",
      },
    ],
  },
  {
    title: "Settings",
    items: [
      { name: "General", icon: IconSettings, url: "/dashboard/settings" },
      {
        name: "Workspace",
        icon: IconBuildingCommunity,
        url: "/dashboard/workspace",
      },
    ],
  },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-(--header-height) border-border border-b justify-center">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">Acme</h1>
          <ModeToggle type="dropdown" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={navGroups} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
