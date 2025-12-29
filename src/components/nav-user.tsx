'use client';
import {
  IconDotsVertical,
  IconLogout,
  IconUserCircle,
} from '@tabler/icons-react';
import defaultUserImage from '@/assets/default-image.jpg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hook/useAuth';
import { toast } from 'sonner';

export function NavUser() {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const { user, logout } = useAuth()

  console.log(user)
  const handleLogout = () => {
    logout() // handled from localStorage
    toast.success("Logout successfull")
    navigate('/login');
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              aria-label="User menu">
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                {/* {!avatarError && user.avatarUrl ? (
                  <AvatarImage
                    src={defaultUserImage}
                    // src={user.avatarUrl}
                    alt={user.displayName}
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <AvatarFallback className="rounded-lg">
                    {user.displayName?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                )} */}
                <AvatarImage
                  src={user?.profileUrl || defaultUserImage}
                  alt={user?.first_name}
                // onError={() => setAvatarError(true)}
                />
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.first_name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user?.email}
                </span>
              </div>
              <IconDotsVertical
                className="ml-auto size-4 opacity-70 group-hover:opacity-100"
                aria-hidden="true"
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.profileUrl || defaultUserImage}
                    alt={user?.first_name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user?.first_name?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user?.first_name + " " + user?.last_name}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle className="mr-2 size-4" />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:text-destructive">
              <IconLogout className="mr-2 size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
