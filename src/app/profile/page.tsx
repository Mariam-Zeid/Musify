"use client";

import Link from "next/link";
import PageHeader from "@/components/shared/page header/pageHeader";
import SongCard from "@/components/shared/songs/songCard";
import SongCardListWrapper from "@/components/shared/songs/songCardListWrapper";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const handleDeleteAccount = async () => {
    console.log("logging out");
  };
  return (
    <>
      <PageHeader
        type="user"
        title="Bob Smith"
        subtitle="bob@example.com"
        imageSrc="/images/user.jpg"
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
          <SongCard title="Bob's Songs" imageSrc="/images/song-logo.avif" />
        </Link>
        <Link href="/profile/playlists/playlist1">
          <SongCard title="Playlist 1" />
        </Link>
      </SongCardListWrapper>
    </>
  );
};

export default ProfilePage;
