"use client";

import {
  usePlaylistMutations,
  usePlaylistTracks,
} from "@/client/hooks/usePlaylists";
import SongItemRow from "@/components/shared/songs/songItemRow";

interface PlaylistTracksProps {
  playlistId: string;
}
const PlaylistTracks = ({ playlistId }: PlaylistTracksProps) => {
  const { data: playlistTracks } = usePlaylistTracks({
    playlistId,
  });

  const { removeTrackFromPlaylist } = usePlaylistMutations();

  const handleRemoveTrack = (trackId: string) => {
    removeTrackFromPlaylist({ playlistId, trackId });
  };

  if (playlistTracks?.length === 0) {
    return <p>No tracks in playlist</p>
  }

  return (
    <div className="wrapper">
      {playlistTracks?.map((track) => (
        <SongItemRow
          key={track.id}
          showSongOptions={true}
          title={track.track.name}
          subtitle={track.track.artist?.name}
          imageSrc={track.track.image || track.track?.album?.image || ""}
          onRemoveFromPlaylist={() => handleRemoveTrack(track.trackId)}
          isInPlaylist={true}
        />
      ))}
    </div>
  );
};

export default PlaylistTracks;
