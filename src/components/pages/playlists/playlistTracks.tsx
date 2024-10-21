"use client";

import {
  usePlaylistTracks,
} from "@/client/hooks/usePlaylists";
import Loading from "@/components/shared/loading/loading";
import SongItemList from "@/components/shared/songs/songItemList";
import { Track } from "@prisma/client";

interface PlaylistTracksProps {
  playlistId: string;
}
const PlaylistTracks = ({ playlistId }: PlaylistTracksProps) => {
  const { data: playlistTracks , isLoading} = usePlaylistTracks({
    playlistId,
  });

  if (playlistTracks?.length === 0) {
    return <p>No tracks in playlist</p>
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SongItemList
      tracks={(playlistTracks || []).map((track) => track.track as Track)}
      playlistId={playlistId}
      showSongOptions={true}
      isInPlaylist={true}
    />
  );
};

export default PlaylistTracks;
