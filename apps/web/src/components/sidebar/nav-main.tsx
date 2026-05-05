import { type TablerIcon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";

interface NavItem {
  name: string;
  url: string;
  icon: TablerIcon;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export function NavMain({ groups }: { groups: NavGroup[] }) {
  return (
    <>
      {groups.map((group) => (
        <SidebarGroup key={group.title} className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  render={
                    <Link
                      to={item.url}
                      activeProps={{ "data-active": true }}
                      activeOptions={{ exact: true }}
                    />
                  }
                >
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
