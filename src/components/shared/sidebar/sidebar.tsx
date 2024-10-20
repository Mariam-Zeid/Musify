"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";

import { cn } from "@/lib/utils";
import Library from "./library";
import SidebarContentWrapper from "./sidebarContentWrapper";
import useTrackPlayer from "@/client/store/useTrackPlayer";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const pathname = usePathname();
  const { activeId } = useTrackPlayer();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname === "/",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );
  return (
    <div
      className={cn(
        "flex h-full",
        activeId && "h-[calc(100%-190px)] md:h-[calc(100%-120px)]"
      )}
    >
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <SidebarContentWrapper>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className={cn(
                    `flex flex-row w-auto h-full items-center gap-x-4 
                    text-md font-medium cursor-pointer hover:text-white transition
                    text-neutral-400 p-1`,
                    item.active && "text-white"
                  )}
                >
                  <Icon size={26} />
                  <p className="truncate w-full">{item.label}</p>
                </Link>
              );
            })}
          </div>
        </SidebarContentWrapper>
        <SidebarContentWrapper className="scrollbar h-full">
          <Library />
        </SidebarContentWrapper>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
