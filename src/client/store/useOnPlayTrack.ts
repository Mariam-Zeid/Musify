"use client";

import { useRouter } from "next/navigation";
import { Track, UserTrack } from "@prisma/client";

import useTrackPlayer from "@/client/store/useTrackPlayer";
import { useCurrentUser } from "@/client/store/useCurrentUser";

type Entity = Track | UserTrack;

const useOnPlayTrack = (tracks: Entity[]) => {
  const player = useTrackPlayer();
  const { user } = useCurrentUser();
  const router = useRouter();

  const onPlayTrack = (id: string) => {
    if (!user) {
      return router.push("/auth/login");
    }
    player.setId(id);
    player.setIds(tracks.map((track) => track.id));
  };

  return onPlayTrack;
};

export default useOnPlayTrack;
