"use client";

import { useEffect, useState } from "react";

import MusicPlayerContent from "./musicPlayerContent";
import useTrackPlayer from "@/client/store/useTrackPlayer";
import { useTrackById } from "@/client/hooks/useTracks";

const MusicPlayer = () => {
  const player = useTrackPlayer();
  const [trackId, setTrackId] = useState<string | null>(null);

  useEffect(() => {
    if (player.activeId) {
      setTrackId(player.activeId);
    }
  }, [player.activeId, trackId]);

  const { data: track, isLoading: isTrackLoading } = useTrackById({
    trackId: trackId || "",
  });

  if (!trackId || !track) {
    return null;
  }

  if (isTrackLoading) {
    return null;
  }

  return (
    <div
      className="
        fixed 
        bottom-0 
        left-0
        bg-black 
        w-full
        h-[190px]
        md:h-[120px]
        px-4
        pt-3
        pb-10
      "
    >
      <MusicPlayerContent track={track} trackUrl={track.audio_url} />
    </div>
  );
};

export default MusicPlayer;
