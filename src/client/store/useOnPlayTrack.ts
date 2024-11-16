"use client";

import { usePathname, useRouter } from "next/navigation";
import { Track, UserTrack } from "@prisma/client";
import { useDebouncedCallback } from "use-debounce";

import useTrackPlayer from "@/client/store/useTrackPlayer";
import { useCurrentUser } from "@/client/store/useCurrentUser";
import { updateListeningHistory } from "@/server/actions/user";

type Entity = Track | UserTrack;

const useOnPlayTrack = (tracks: Entity[]) => {
  const player = useTrackPlayer();
  const { user } = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();

  const debouncedUpdateListeningHistory = useDebouncedCallback(
    async (id: string) => {
      await updateListeningHistory(id);
    },
    300
  );

  const onPlayTrack = async (id: string) => {
    if (!user) {
      return router.push("/auth/login");
    }

    if (pathname !== "/profile/user-songs") {
      debouncedUpdateListeningHistory(id);
    }

    player.setId(id);
    player.setIds(tracks.map((track) => track.id));
  };

  return onPlayTrack;
};

export default useOnPlayTrack;
