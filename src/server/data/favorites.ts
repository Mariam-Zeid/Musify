"use server";

import { prisma } from "@/server/db";
import { currentUser } from "@/server/currentUser";

export const getUserFavorites = async () => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return;
  }

  const favorites = await prisma.favoriteTrack.findMany({
    where: {
      user_id: userId,
    },
    include: {
      track: {
        include: {
          artist: true,
          album: true,
        },
      },
    },
  });
  return favorites;
};
export const getFavoriteTrack = async (trackId: string) => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return;
  }

  const favorite = await prisma.favoriteTrack.findUnique({
    where: {
      user_id_track_id: {
        user_id: userId,
        track_id: trackId,
      },
    },
  });

  return favorite;
};
