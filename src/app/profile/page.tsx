"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import PageHeader from "@/components/shared/page header/pageHeader";
import SongCard from "@/components/shared/songs/songCard";
import SongCardListWrapper from "@/components/shared/songs/songCardListWrapper";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/client/store/useCurrentUser";
import { deleteAccount } from "@/server/actions/user";
import { useUserPlaylists } from "@/client/hooks/usePlaylists";
import Loading from "@/components/shared/loading/loading";

const ProfilePage = () => {
  const { user } = useCurrentUser();
  const { data: playlists, isLoading, isRefetching } = useUserPlaylists();

  const handleDeleteAccount = async () => {
    if (user && user.id) {
      await deleteAccount(user.id);
      await signOut();
    }
  };

  if (!user) {
    return null;
  }

  if (isLoading || isRefetching) {
    return <Loading />;
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
        <Link href="/profile/recommended-songs">
          <SongCard
            title="Recommended Songs"
            imageSrc="/images/recommendations.jpg"
          />
        </Link>
        <Link href="/profile/favorites">
          <SongCard title="Favorites" />
        </Link>
        <Link href="/profile/user-songs">
          <SongCard
            title={`${
              user?.name ? capitalizeFirstLetter(user.name.split(" ")[0]) : ""
            }'s Songs`}
            imageSrc="/images/my-playlist.jpg"
          />
        </Link>
        {playlists?.map((playlist) => (
          <Link href={`/profile/playlists/${playlist.id}`} key={playlist.id}>
            <SongCard
              title={playlist.name}
              imageSrc={playlist.image || "/images/song-logo.avif"}
            />
          </Link>
        ))}
      </SongCardListWrapper>
    </>
  );
};

export default ProfilePage;
