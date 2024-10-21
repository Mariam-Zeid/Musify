"use client";

import { Track, UserTrack } from "@prisma/client";
import useOnPlayTrack from "@/client/store/useOnPlayTrack";
import SongItemRow from "./songItemRow";
import { usePlaylistMutations } from "@/client/hooks/usePlaylists";

type Entity = Track | UserTrack;

interface SongItemListProps {
  tracks: Entity[];
  playlistId?: string;
  onRemove?: () => void;
  showLikeButton?: boolean;
  showSongOptions?: boolean;
  isInPlaylist?: boolean;
}

const SongItemList = ({
  tracks,
  playlistId,
  showLikeButton,
  showSongOptions,
  isInPlaylist,
}: SongItemListProps) => {
  const onPlay = useOnPlayTrack(tracks || []);

  const { removeTrackFromPlaylist } = usePlaylistMutations();
  const handleRemoveTrack = (trackId: string) => {
    removeTrackFromPlaylist({ playlistId: playlistId || "", trackId });
  };

  if (!tracks) {
    return null;
  }

  if (tracks.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full">
        <p className="text-white text-center md:text-start">No tracks found</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full ">
      {tracks.map((track) => (
        <SongItemRow
          key={track.id}
          track={track}
          title={track.name}
          // @ts-expect-error Property 'artist, user' does not exist on type 'Track'
          subtitle={track?.artist?.name || track?.user?.name}
          // @ts-expect-error Property 'album' does not exist on type 'Track'
          imageSrc={track.image || track?.album?.image || ""}
          onClick={() => onPlay(track.id)}
          onRemoveFromPlaylist={() => {
            handleRemoveTrack(track.id);
          }}
          showLikeButton={showLikeButton}
          showSongOptions={showSongOptions}
          isInPlaylist={isInPlaylist}
        />
      ))}
    </div>
  );
};

export default SongItemList;
