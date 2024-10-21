"use client";

import { Track, UserTrack } from "@prisma/client";
import { useUserTracks } from "@/client/hooks/useUserTrack";
import { useCurrentUser } from "@/client/store/useCurrentUser";
import Loading from "@/components/shared/loading/loading";
import PageHeader from "@/components/shared/page header/pageHeader";
import SongItemList from "@/components/shared/songs/songItemList";

const UserSongsPage = () => {
  const { user } = useCurrentUser();
  const { data: userTracks, isLoading } = useUserTracks();

  const capitalizeFirstLetter = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  const tracks: (Track | UserTrack)[] = Array.isArray(userTracks)
    ? userTracks
    : [];

  if (!user) {
    return null;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <PageHeader
        type="userSongs"
        title={`${
          user?.name ? capitalizeFirstLetter(user.name.split(" ")[0]) : ""
        }'s Songs`}
        subtitle="playlist"
        imageSrc="/images/my-playlist.jpg"
      />
      <SongItemList
        tracks={tracks || []}
        showSongOptions={true}
        showLikeButton={false}
      />
    </>
  );
};

export default UserSongsPage;
