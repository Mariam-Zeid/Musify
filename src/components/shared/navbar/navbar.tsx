"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import UserButton from "./userButton";
import { useCurrentUser } from "@/client/store/useCurrentUser";

interface NavbarProps {
  children?: React.ReactNode;
  className?: string;
}

const Navbar = ({ children, className }: NavbarProps) => {
  const router = useRouter();
  const { user } = useCurrentUser();

  return (
    <div className={cn(`h-fit p-6 pb-4`, className)}>
      <div className="w-full mb-4 flex justify-between items-center">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            className="rounded-full bg-black flex justify-center items-center hover:opacity-75 transition"
            onClick={() => router.back()}
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            className="rounded-full bg-black flex justify-center items-center hover:opacity-75 transition"
            onClick={() => router.forward()}
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center jusitfy-center hover:opacity-75 transition">
            <Link href="/">
              <HiHome className="text-black" size={20} />
            </Link>
          </button>
          <button className="rounded-full p-2 bg-white flex items-center jusitfy-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justufy-between items-center gap-x-4">
          {user ? (
            <UserButton />
          ) : (
            <>
              <Button variant="ghost">
                <Link href="/auth/register">Signup</Link>
              </Button>
              <Button size="lg" variant="secondary">
                <Link href="/auth/login">Login</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Navbar;
