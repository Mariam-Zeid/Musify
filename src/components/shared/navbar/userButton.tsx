"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/client/store/useCurrentUser";
import { UserRole } from "@prisma/client";

const UserButton = () => {
  const router = useRouter();
  const { user, update } = useCurrentUser();

  const handleLogout = async () => {
    await signOut();
    await update();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer rounded-full">
        <Avatar>
          <AvatarImage
            src={user?.image || "https://github.com/shadcn.png"}
            alt="user image"
          />
          <AvatarFallback className="bg-white">
            <FaUser className="text-black" size={18} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-none" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              router.push(`/profile`);
            }}
          >
            <FaUser className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          {user?.role === UserRole.ADMIN && (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                router.push(`/dashboard`);
              }}
            >
              <MdDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            <BiLogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
