"use client";

import { UserRole } from "@prisma/client";
import { useAlbumTracks } from "@/client/hooks/useTracks";
import { useCurrentRole } from "@/client/store/useCurrentUser";
import Loading from "@/components/shared/loading/loading";
import SongItemList from "@/components/shared/songs/songItemList";

interface AlbumTracksProps {
  albumId: string;
}
const AlbumTracks = ({ albumId }: AlbumTracksProps) => {
  const { role } = useCurrentRole();
  const isAdmin = role === UserRole.ADMIN;
  const { data: tracks, isLoading, isRefetching } = useAlbumTracks({ albumId });

  if (isLoading || isRefetching) return <Loading />;

  if (!tracks) return <p className="mt-5">No tracks found</p>;
  return <SongItemList tracks={tracks} showSongOptions={isAdmin} />;
};

export default AlbumTracks;
