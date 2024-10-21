"use client";

import { Track, UserTrack } from "@prisma/client";
import { useTrackMutations } from "@/client/hooks/useTracks";
import LikeButton from "./likeButton";
import SongItem from "./songItem";
import SongOptions from "./songOptions";

interface SongItemRowProps {
  track?: Track | UserTrack;
  imageSrc?: string;
  title?: string;
  subtitle?: string;
  onClick?: () => void;
  showLikeButton?: boolean;
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
  showLikeButton = true,
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
      {showLikeButton && <LikeButton track={track as Track} />}
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
