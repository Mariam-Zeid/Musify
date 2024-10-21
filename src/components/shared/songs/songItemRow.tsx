"use client";

import { Track } from "@prisma/client";
import { useTrackMutations } from "@/client/hooks/useTracks";
import LikeButton from "./likeButton";
import SongItem from "./songItem";
import SongOptions from "./songOptions";

interface SongItemRowProps {
  track?: Track;
  imageSrc?: string;
  title?: string;
  subtitle?: string;
  onClick?: () => void;
  showSongOptions?: boolean;
  onAddToPlaylist?: () => void;
  onRemoveFromPlaylist?: () => void;
  isInPlaylist?: boolean;
}
const SongItemRow = ({
  track,
  imageSrc,
  title,
  subtitle,
  onClick,
  showSongOptions,
  onAddToPlaylist,
  onRemoveFromPlaylist,
  isInPlaylist,
}: SongItemRowProps) => {
  const { deleteTrack } = useTrackMutations();

  return (
    <div className="flex items-center gap-x-4 w-full">
      <div className="flex-1" onClick={onClick}>
        <SongItem imageSrc={imageSrc} title={title} subtitle={subtitle} />
      </div>
      <LikeButton track={track as Track} />
      <SongOptions
        onDelete={() => {
          deleteTrack(track?.id ?? "");
          window.location.reload();
        }}
        showOptions={showSongOptions}
        onAddToPlaylist={onAddToPlaylist}
        onRemoveFromPlaylist={onRemoveFromPlaylist}
        isInPlaylist={isInPlaylist}
      />
    </div>
  );
};

export default SongItemRow;
