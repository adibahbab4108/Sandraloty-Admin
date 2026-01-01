import * as React from 'react';
import {
  IconDashboard,
  IconUsers,
} from '@tabler/icons-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { Link } from 'react-router';
import { useAuth } from '@/hook/useAuth';
import { BadgeDollarSign, Users } from 'lucide-react';

const data = {
  user: {
    name: 'shadcn',
    email: 'ahshobuj@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: IconDashboard,
    },
    {
      title: 'Manage Users',
      url: '/dashboard/manage-users',
      icon: IconUsers,
    },
    {
      title: 'Contractor Details',
      url: '/dashboard/contractor-details',
      icon: Users,
    },
    {
      title: 'Manage Subscription',
      url: '/dashboard/manage-subscription',
      icon: BadgeDollarSign,
    },
    {
      title: 'View  Jobs',
      url: '/dashboard/view-jobs',
      icon: BadgeDollarSign,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, token } = useAuth();
  console.log(user, token)
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!" >
                    <Link to="/dashboard">
                      <img src="/signup_logo.svg" alt="Logo" className="size-6 w-full" />
                      <span className="text-base font-semibold">
                        Mic<span className="text-primary">kanic</span> Admin
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mickanic Admin Dashboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
