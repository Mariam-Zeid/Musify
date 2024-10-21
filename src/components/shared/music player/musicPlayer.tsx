"use client";

import { useEffect, useState } from "react";
import { Track, UserTrack } from "@prisma/client";
import MusicPlayerContent from "./musicPlayerContent";
import useTrackPlayer from "@/client/store/useTrackPlayer";
import { useTrackById } from "@/client/hooks/useTracks";
import { useUserTrackById } from "@/client/hooks/useUserTrack";

const MusicPlayer = () => {
  // const player = useTrackPlayer();
  // const [trackId, setTrackId] = useState<string | null>(null);

  // useEffect(() => {
  //   if (player.activeId) {
  //     setTrackId(player.activeId);
  //   }
  // }, [player.activeId, trackId]);

  // console.log("---------------------");
  // console.log({ trackId });
  // console.log({ playerId: player.activeId });

  // const { data: userTrack } = useUserTrackById({ trackId: trackId || "" });
  // const { data: track } = useTrackById({ trackId: trackId || "" });

  // const trackData = userTrack || track;
  // if (!trackData) {
  //   return null;
  // }

  const player = useTrackPlayer();
  const [trackId, setTrackId] = useState<string | null>(null);

  useEffect(() => {
    if (player.activeId) {
      setTrackId(player.activeId);
    }
  }, [player.activeId, trackId]);

  console.log("---------------------");
  console.log({ trackId });
  console.log({ playerId: player.activeId });

  const {
    data: track,
    isLoading: trackLoading,
    isError: trackError,
  } = useTrackById({
    trackId: trackId || "",
  });

  const {
    data: userTrack,
    isLoading: userTrackLoading,
    isError: userTrackError,
  } = useUserTrackById({
    trackId: trackId || "",
  });

  // Handle loading and errors
  if (trackLoading || userTrackLoading) {
    return <div>Loading...</div>;
  }

  if (trackError || userTrackError) {
    console.error("Error fetching track data.");
    return <div>Error loading track data</div>;
  }

  // Ensure we prioritize user-specific track first, then fall back to general track
  const trackData = userTrack ?? track; // Use nullish coalescing to ensure fallback

  // If neither track is available, return null
  if (!trackData) {
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
      <MusicPlayerContent
        track={trackData as Track | UserTrack}
        trackUrl={trackData?.audio_url ?? ""}
      />
    </div>
  );
};

export default MusicPlayer;
