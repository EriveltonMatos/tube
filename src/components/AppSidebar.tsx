"use client";
import { usePathname } from "next/navigation"; // Importa usePathname
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import unitube from "@/assets/unitube.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
];

export function AppSidebar() {
  const pathname = usePathname(); // Obtém o pathname atual

  return (
    <Sidebar variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="mt-16 scale-105">
              <Image src={unitube} alt={""} />
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-20 space-y-2">
              {items.map((item) => {
                const isActive = pathname === item.url; // Verifica se a rota atual é igual ao item do menu
                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={`transition-all duration-300 rounded-lg  ${
                      isActive ? "bg-blue-900 dark:bg-[#611e72]" : ""
                    }`}
                  >
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="flex items-center gap-3 px-4 py-3 w-full"
                      >
                        <item.icon className="dark:text-[#b93ad8]"/>
                        <span className="font-medium ">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}