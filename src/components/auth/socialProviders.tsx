"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export function SocialProviders() {
  const onClick = async (provider: string) => {
    await signIn(provider, { callbackUrl: "/" });
  };
  return (
    <div className="flex items-center w-full gap-2">
      <Button
        type="button"
        onClick={() => onClick("google")}
        className="w-full py-6 flex justify-center items-center rounded-lg bg-[#2e2e2e] hover:bg-[#3e3e3e] transition"
      >
        <FcGoogle className="size-6" />
      </Button>
      <Button
        type="button"
        onClick={() => onClick("github")}
        className="w-full py-6 flex justify-center rounded-lg bg-[#2e2e2e] hover:bg-[#3e3e3e] transition"
      >
        <FaGithub className="size-6" />
      </Button>
    </div>
  );
}
