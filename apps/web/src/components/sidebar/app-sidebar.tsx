import {
  IconAt,
  IconBriefcase,
  IconCertificate,
  IconFileText,
  IconFolder,
  IconHome,
  IconSchool,
  IconStack2,
  IconTrophy,
  IconUser,
} from "@tabler/icons-react";
import type * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import type {User} from "better-auth";
import { ModeToggle } from "../mode-toggle";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const navGroups = [
  {
    title: "Home",
    items: [
      { name: "Overview", icon: IconHome, url: "/dashboard", exact: true },
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
      { name: "Education", icon: IconSchool, url: "/dashboard/education" },
      { name: "Achievements", icon: IconTrophy, url: "/dashboard/achievement" },
    ],
  },
  {
    title: "Settings",
    items: [
      { name: "Hero / Bio", icon: IconUser, url: "/dashboard/hero" },
      {
        name: "Social Links",
        icon: IconAt,
        url: "/dashboard/social-links",
      },
      { name: "Resume", icon: IconFileText, url: "/dashboard/resume" },
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
