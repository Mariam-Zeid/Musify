"use client";

import { usePlaylistMutations, usePlaylistTracks } from "@/client/hooks/usePlaylists";
import { useAllTracks } from "@/client/hooks/useTracks";
import Loading from "@/components/shared/loading/loading";
import SongItemRow from "@/components/shared/songs/songItemRow";

const AddTracksToPlaylist = ({ playlistId }: { playlistId: string }) => {
  const { data: allTracks, isLoading } = useAllTracks();
  const { data: playlistTracks } = usePlaylistTracks({ playlistId });
  const { addTrackToPlaylist } = usePlaylistMutations();

  if (isLoading) {
    return <Loading />;
  }

  // Extract the IDs of tracks already in the playlist
  const trackIdsInPlaylist = new Set(
    (playlistTracks || []).map((playlistTrack) => playlistTrack.track.id)
  );

  // Filter tracks that are not already in the playlist
  const availableTracks = allTracks?.filter(
    (track) => !trackIdsInPlaylist.has(track.id)
  );

  if (!availableTracks) {
    return null;
  }

  const handleAddToPlaylist = (trackId: string) => {
    addTrackToPlaylist({ playlistId, trackId });
  };

  return (
    <div className="wrapper">
      {availableTracks.length === 0 && (
        <p>No tracks available to add to the playlist</p>
      )}
      {availableTracks.length > 0 && (
        <p className="text-neutral-400">Add tracks to the playlist</p>
      )}
      {allTracks
        ?.filter((track) => !trackIdsInPlaylist.has(track.id)) // Only include tracks not in the playlist
        .map((track) => (
          <SongItemRow
            key={track.id}
            track={track}
            showSongOptions={true}
            title={track.name}
            subtitle={track?.artist?.name}
            imageSrc={track.image || track?.album?.image || ""}
            onAddToPlaylist={() => handleAddToPlaylist(track.id)}
          />
        ))}
    </div>
  );
};

export default AddTracksToPlaylist;
