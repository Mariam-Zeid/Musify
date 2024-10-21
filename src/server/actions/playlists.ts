"use server";

import { AddPlaylistSchema, addPlaylistSchema } from "@/lib/validations/user";
import { prisma } from "@/server/db";
import { currentUser } from "@/server/currentUser";
import { getPlaylistById, getPlaylistByName } from "@/server/data/playlist";
import { redirect } from "next/navigation";
import { deleteFile } from "@/lib/supabaseBuckets";

export const addPlaylist = async (values: AddPlaylistSchema) => {
  const validatedFields = addPlaylistSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid credentials!" };
  }

  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized" };
  }

  const { name, image } = validatedFields.data;

  const existingPlaylist = await getPlaylistByName(name);
  if (existingPlaylist) {
    return { error: "Playlist already exists!" };
  }
  await prisma.playlist.create({
    data: { name, image, user_id: user?.id },
  });

  redirect("/profile");
};
export const deletePlaylist = async (playlistId: string) => {
  const existingPlaylist = await getPlaylistById(playlistId);

  if (!existingPlaylist) {
    return { error: "Playlist not found" };
  }

  const imageUrl = existingPlaylist.image;

  await prisma.playlist.delete({
    where: { id: existingPlaylist.id },
  });

  if (imageUrl) {
    const { error: removeError } = await deleteFile(imageUrl, "users");
    if (removeError) {
      return {
        error: `Playlist deleted, but image deletion failed: ${removeError}`,
      };
    }
  }

  redirect("/profile");
};
export const addTrackToPlaylist = async (
  playlistId: string,
  trackId: string
) => {
  const playlist = await getPlaylistById(playlistId);
  if (!playlist) {
    return { error: "Playlist not found" };
  }

  const existingTrackInPlaylist = await prisma.playlistTrack.findUnique({
    where: {
      playlist_id_track_id: {
        playlist_id: playlistId,
        track_id: trackId,
      },
    },
  });

  if (existingTrackInPlaylist) {
    return { error: "Track is already in the playlist" };
  }

  await prisma.playlistTrack.create({
    data: {
      playlist_id: playlistId,
      track_id: trackId,
    },
  });

  return { success: "Track added to the playlist" };
};
export const removeTrackFromPlaylist = async (
  playlistId: string,
  trackId: string
) => {
  const existingTrackInPlaylist = await prisma.playlistTrack.findUnique({
    where: {
      playlist_id_track_id: {
        playlist_id: playlistId,
        track_id: trackId,
      },
    },
  });

  if (!existingTrackInPlaylist) {
    return { error: "Track not found in the playlist" };
  }

  await prisma.playlistTrack.delete({
    where: {
      playlist_id_track_id: {
        playlist_id: playlistId,
        track_id: trackId,
      },
    },
  });

  return { success: "Track removed from the playlist" };
};
