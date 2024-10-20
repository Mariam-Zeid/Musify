"use client";

import { Track } from "@prisma/client";
import useOnPlayTrack from "@/client/store/useOnPlayTrack";
import SongItemRow from "./songItemRow";

type Entity = Track;

interface SongItemListProps {
  tracks: Entity[];
  showSongOptions?: boolean;
}

const SongItemList = ({ tracks , showSongOptions }: SongItemListProps) => {
  const onPlay = useOnPlayTrack(tracks || []);

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
          // @ts-expect-error Property 'artist' does not exist on type 'Track'
          subtitle={track.artist.name}
          // @ts-expect-error Property 'album' does not exist on type 'Track'
          imageSrc={track.image || track?.album?.image || ""}
          onClick={() => onPlay(track.id)}
          showSongOptions={showSongOptions}
        />
      ))}
    </div>
  );
};

export default SongItemList;
