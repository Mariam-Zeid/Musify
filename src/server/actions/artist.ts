"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/server/db";
import { addArtistSchema, AddArtistSchema } from "@/lib/validations/artist";
import { getArtistById, getArtistByName } from "@/server/data/artist";
import { deleteFile } from "@/lib/supabaseBuckets";
import { getAlbumsByArtistId } from "@/server/data/album";

export const addArtist = async (values: AddArtistSchema) => {
  const validatedFields = addArtistSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid credentials!" };
  }

  const { name, image } = validatedFields.data;

  const existingArtist = await getArtistByName(
    validatedFields.data.name.toLowerCase()
  );

  if (existingArtist) return { error: "Artist already exists!" };

  await prisma.artist.create({
    data: { name: name.toLowerCase(), image: image || null },
  });

  redirect("/artists");
};
export const deleteArtist = async (id: string) => {
  const existingArtist = await getArtistById(id);

  if (!existingArtist) {
    return { error: "Artist not found!" };
  }

  const artistImageUrl = existingArtist.image;

  await prisma.$transaction(async (prisma) => {
    const albums = await getAlbumsByArtistId(id);

    const albumImageUrls = albums.map((album) => album.image);

    await prisma.album.deleteMany({
      where: { artist_id: id },
    });

    await prisma.artist.delete({
      where: { id },
    });

    for (const albumImageUrl of albumImageUrls) {
      if (albumImageUrl) {
        const { error: removeAlbumImageError } = await deleteFile(
          albumImageUrl,
          "artists"
        );
        if (removeAlbumImageError) {
          console.error(
            `Album image deletion failed: ${removeAlbumImageError}`
          );
        }
      }
    }
  });

  if (artistImageUrl) {
    const { error: removeError } = await deleteFile(artistImageUrl, "artists");
    if (removeError) {
      return {
        error: `Artist deleted, but image deletion failed: ${removeError}`,
      };
    }
  }
  
  redirect("/artists");
};
