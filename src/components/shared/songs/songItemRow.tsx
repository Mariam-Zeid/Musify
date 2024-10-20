"use client";

import LikeButton from "./likeButton";
import SongItem from "./songItem";
import SongOptions from "./songOptions";

interface SongItemRowProps {
  imageSrc?: string;
  title?: string;
  subtitle?: string;
}
const SongItemRow = ({ imageSrc, title, subtitle }: SongItemRowProps) => {
  return (
    <div className="flex items-center gap-x-4 w-full">
      <div className="flex-1">
        <SongItem imageSrc={imageSrc} title={title} subtitle={subtitle} />
      </div>
      <LikeButton />
      <SongOptions onDelete={() => console.log("deleted")} />
    </div>
  );
};

export default SongItemRow;
