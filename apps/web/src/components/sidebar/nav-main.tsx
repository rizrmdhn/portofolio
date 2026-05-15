import type {TablerIcon} from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";

interface NavItem {
  name: string;
  url: string;
  icon: TablerIcon;
  exact?: boolean;
}

interface NavGroup {
  title: string;
  items: Array<NavItem>;
}

export function NavMain({ groups }: { groups: Array<NavGroup> }) {
  const { isMobile, setOpenMobile } = useSidebar()

  return (
    <>
      {groups.map((group) => (
        <SidebarGroup
          key={group.title}
          className="group-data-[collapsible=icon]:hidden"
        >
          <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  render={
                    <Link
                      to={item.url}
                      activeProps={{ "data-active": true }}
                      activeOptions={{ exact: item.exact ?? false }}
                      onClick={() => isMobile && setOpenMobile(false)}
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
