"use client";

import Link from "next/link";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/client/store/useCurrentUser";
import { Button } from "@/components/ui/button";
import AllArtists from "@/components/pages/artists/allArtists";

const AllArtistsPage = () => {
  const { role } = useCurrentRole();
  const isAdmin = role === UserRole.ADMIN;
  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-center sm:text-start">
        All Artists
      </h1>
      {isAdmin && (
        <Button variant="musify" className="max-w-max">
          <Link href="/artists/new-artist">Add Artist</Link>
        </Button>
      )}
      <AllArtists />
    </div>
  );
};

export default AllArtistsPage;
