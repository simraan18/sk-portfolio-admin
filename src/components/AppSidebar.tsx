import { ChevronsUpDown, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

import AppLogo from "@/assets/AppLogo.png";
import { useGetUserQuery, useSignOutMutation } from "@/store/service/authApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link, useNavigate } from "react-router";
import { routePath } from "@/routes/route-path";
import { apiError } from "@/utils";
import { useAppDispatch } from "@/store/hooks";
import { setAuthState, setToken } from "@/store/slice/auth-slice";
import type { ISidebar } from "@/vite-env";
import { sidePanelKeys } from "@/routes/navigation";

const AppSidebar = ({ sidePanel }: { sidePanel: ISidebar }) => {
  const { data: userData } = useGetUserQuery();

  const [signOut] = useSignOutMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    try {
      await signOut().unwrap();
      dispatch(setAuthState(null));
      dispatch(setToken(null));
      navigate(routePath.login);
    } catch (error) {
      apiError(error);
    }
  };

  const user = userData?.response;

  return (
    <Sidebar variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to={routePath.home}>
              <img
                src={AppLogo}
                alt="App Logo"
                className="w-56 aspect-square"
              />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {sidePanelKeys.map((key) => (
          <SidebarGroup key={key}>
            <SidebarGroupLabel>{sidePanel[key].label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidePanel[key].navigations.map(
                  ({ icon: Icon, id, label, path }) => (
                    <Link key={id} to={path}>
                      <SidebarMenuItem>
                        <SidebarMenuButton className="cursor-pointer">
                          <Icon />
                          {label}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Link>
                  ),
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      {user ? (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        className="rounded-full flex items-center justify-between w-full"
                      >
                        <div className="flex gap-2">
                          <Avatar>
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="shadcn"
                            />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((name) => name[0].toUpperCase())}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col text-xs w-full items-start text-secondary-foreground">
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                          </div>
                        </div>
                        <ChevronsUpDown />
                      </Button>
                    }
                  ></DropdownMenuTrigger>
                  <DropdownMenuContent side="left">
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="text-destructive" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      ) : null}
    </Sidebar>
  );
};

export default AppSidebar;
