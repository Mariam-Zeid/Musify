"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/server/db";
import { addArtistSchema, AddArtistSchema } from "@/lib/validations/artist";
import { getArtistById, getArtistByName } from "@/server/data/artist";
import { deleteFile } from "@/lib/supabaseBuckets";

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

  await prisma.artist.delete({
    where: { id },
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
