"use client";

import { useAllTracks } from "@/client/hooks/useTracks";
import Loading from "@/components/shared/loading/loading";
import SongItemList from "@/components/shared/songs/songItemList";

const AllTracks = () => {
  const { data: tracks, isLoading } = useAllTracks();

  if (isLoading) return <Loading />;

  if (!tracks) return <p className="mt-5">No tracks found</p>;

  return <SongItemList tracks={tracks}  showSongOptions={false}/>;
};

export default AllTracks;
