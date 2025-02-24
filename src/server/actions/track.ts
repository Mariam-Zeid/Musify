"use server";

import { redirect } from "next/navigation";

import { prisma } from "@/server/db";
import { addTrackSchema, AddTrackSchema } from "@/lib/validations/track";
import { getTrackById, getTrackByName } from "@/server/data/track";
import { deleteFile } from "@/lib/supabaseBuckets";
import { getArtistById } from "../data/artist";
import { getAlbumById } from "../data/album";

export const addTrack = async (values: AddTrackSchema) => {
  const validatedFields = addTrackSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid credentials!" };
  }

  const { name, image, audio_url, artist_id, album_id, year } = validatedFields.data;

  // Verify artist and album exist
  const artistExists = await getArtistById(artist_id);
  const albumExists = await getAlbumById(album_id);

  if (!artistExists || !albumExists) {
    return { error: "Artist or album not found." };
  }

  const existingTrack = await getTrackByName(
    validatedFields.data.name.toLowerCase()
  );
  if (existingTrack) return { error: "Track already exists!" };

  if (!image) {
    validatedFields.data.image = null;
  }

  if (!year){
    validatedFields.data.year = new Date().getFullYear();
  }
  if (year && year < 0) {
    return { error: "Enter a valid year" };
  }
  await prisma.track.create({
    data: { name: name.toLowerCase(), image, audio_url, artist_id, album_id, year },
  });

  redirect(`/artists/${artist_id}/${album_id}`);
};
export const deleteTrack = async (id: string) => {
  const existingTrack = await getTrackById(id);

  if (!existingTrack) {
    return { error: "Track not found!" };
  }

  const imageUrl = existingTrack.image;
  const audioUrl = existingTrack.audio_url;

  const artistId = existingTrack.artist_id;
  const albumId = existingTrack.album_id;

  await prisma.track.delete({
    where: { id },
  });

  if (imageUrl) {
    const { error: removeError } = await deleteFile(imageUrl, "artists");
    if (removeError) {
      return {
        error: `Track deleted, but image deletion failed: ${removeError}`,
      };
    }
  }

  if (audioUrl) {
    const { error: removeError } = await deleteFile(audioUrl, "artists");
    if (removeError) {
      return {
        error: `Track deleted, but audio deletion failed: ${removeError}`,
      };
    }
  }

  redirect(`/artists/${artistId}/${albumId}`);
};
