"use server";

import { prisma } from "@/server/db";
import { currentUser } from "@/server/currentUser";

export const getUserPlaylists = async () => {
  const user = await currentUser();
  const userId = user?.id;
  const playlists = await prisma.playlist.findMany({
    where: { userId },
  });

  return playlists;
};
export const getPlaylistById = async (playlistId: string) => {
  try {
    const playlist = await prisma.playlist.findUnique({
      where: { id: playlistId },
    });
    return playlist;
  } catch {
    return null;
  }
};
export const getPlaylistByName = async (name: string) => {
  try {
    const playlist = await prisma.playlist.findFirst({
      where: { name },
    });
    return playlist;
  } catch {
    return null;
  }
};
export const getPlaylistTracks = async (playlistId: string) => {
  try {
    const tracks = await prisma.playlistTrack.findMany({
      where: { playlistId },
      include: {
        track: {
          include: {
            artist: true,
            album: true,
          },
        },
      },
    });
    return tracks;
  } catch {
    return null;
  }
};
