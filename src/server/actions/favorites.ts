"use server";

import { prisma } from "@/server/db";
import { currentUser } from "@/server/currentUser";
import { getFavoriteTrack } from "@/server/data/favorites";


export const likeTrack = async (trackId: string) => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return { error: "User not authenticated" };
  }
  const existingFavorite = await getFavoriteTrack(trackId);

  if (existingFavorite) {
    return { error: "Track is already in favorites" };
  }

  const newFavorite = await prisma.favoriteTrack.create({
    data: {
      user_id: userId,
      track_id: trackId,
    },
  });

  return {
    success: "Added to favorites",
    favorite: newFavorite,
  };
};
export const unlikeTrack = async (trackId: string) => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return { error: "User not authenticated" };
  }

  const existingFavorite = await getFavoriteTrack(trackId);

  if (!existingFavorite) {
    return {
      error: "Track not found in favorites",
    };
  }

  await prisma.favoriteTrack.delete({
    where: {
      id: existingFavorite.id,
    },
  });

  return {
    success: "Removed from favorites",
  };
};