"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/server/db";
import { deleteFile } from "@/lib/supabaseBuckets";
import { addAlbumSchema, AddAlbumSchema } from "@/lib/validations/album";
import { getAlbumById, getAlbumByName } from "@/server/data/album";
import { getTracksByAlbumId } from "@/server/data/track";

export const addAlbum = async (values: AddAlbumSchema) => {
  const validatedFields = addAlbumSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid credentials!" };
  }

  const { name, image, artist_id } = validatedFields.data;

  const existingAlbum = await getAlbumByName(
    validatedFields.data.name.toLowerCase()
  );
  if (existingAlbum) return { error: "Album already exists!" };

  await prisma.album.create({
    data: { name: name.toLowerCase(), image, artist_id },
    select: { artist: { select: { name: true } } },
  });

  redirect(`/artists/${artist_id}`);
};
export const deleteAlbum = async (id: string) => {
  const existingAlbum = await getAlbumById(id);

  if (!existingAlbum) {
    return { error: "Artist not found!" };
  }

  const albumImageUrl = existingAlbum.image;
  const artistId = existingAlbum.artist_id;


  await prisma.$transaction(async (prisma) => {
    const tracks = await getTracksByAlbumId(id);

    if (!tracks) {
      return { error: "Album has tracks associated with it!" };
    }

    const trackImageUrls = tracks.map((track) => track.image);
    const trackAudioUrls = tracks.map((track) => track.audio_url);

    await prisma.track.deleteMany({
      where: { album_id: id },
    });

    await prisma.album.delete({
      where: { id },
    });

    for (const trackImageUrl of trackImageUrls) {
      if (trackImageUrl) {
        const { error: removeAlbumImageError } = await deleteFile(
          trackImageUrl,
          "artists"
        );
        if (removeAlbumImageError) {
          console.error(
            `Track image deletion failed: ${removeAlbumImageError}`
          );
        }
      }
    }

    for (const trackAudioUrl of trackAudioUrls) {
      if (trackAudioUrl) {
        const { error: removeTrackAudioError } = await deleteFile(
          trackAudioUrl,
          "artists"
        );
        if (removeTrackAudioError) {
          console.error(
            `Track audio deletion failed: ${removeTrackAudioError}`
          );
        }
      }
    }
  });

  if (albumImageUrl) {
    const { error: removeError } = await deleteFile(albumImageUrl, "artists");
    if (removeError) {
      return {
        error: `Album deleted, but image deletion failed: ${removeError}`,
      };
    }
  }
  redirect(`/artists/${artistId}`);
};
