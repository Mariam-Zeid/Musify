"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import PageHeader from "@/components/shared/page header/pageHeader";
import SongCard from "@/components/shared/songs/songCard";
import SongCardListWrapper from "@/components/shared/songs/songCardListWrapper";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/client/store/useCurrentUser";
import { deleteAccount } from "@/server/actions/user";

const ProfilePage = () => {
  const { user } = useCurrentUser();

  const handleDeleteAccount = async () => {
    if (user && user.id) {
      await deleteAccount(user.id);
      await signOut();
    }
  };
  if (!user) {
    return null;
  }

  const capitalizeFirstLetter = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  const userProfileImage = user?.image?.includes("=s96-c")
    ? user.image.replace("=s96-c", "=s800-c") // Requesting a 400px image (google provider)
    : user?.image;

  return (
    <>
      <PageHeader
        type="user"
        title={user?.name || ""}
        subtitle={user?.email || ""}
        imageSrc={userProfileImage || "/images/user.jpg"}
        onDelete={async () => await handleDeleteAccount()}
      />
      <Button variant="musify" className="w-full md:w-auto">
        <Link href="/profile/playlists/new-playlist">Create Playlist</Link>
      </Button>
      <SongCardListWrapper>
        <Link href="/profile/favorites">
          <SongCard title="Favorites" />
        </Link>
        <Link href="/profile/user-songs">
          <SongCard
            title={`${
              user?.name ? capitalizeFirstLetter(user.name.split(" ")[0]) : ""
            }'s Songs`}
            imageSrc="/images/song-logo.avif"
          />
        </Link>
        <Link href="/profile/playlists/playlist1">
          <SongCard title="Playlist 1" />
        </Link>
      </SongCardListWrapper>
    </>
  );
};

export default ProfilePage;
