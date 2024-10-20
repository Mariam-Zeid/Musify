"use server";

import { prisma } from "@/server/db";

export const getAllArtists = async () => {
  try {
    const artists = await prisma.artist.findMany();
    return artists;
  } catch {
    return null;
  }
};
export const getArtistByName = async (name: string) => {
  try {
    const artist = await prisma.artist.findFirst({ where: { name } });
    return artist;
  } catch {
    return null;
  }
};
export const getArtistById = async (id: string) => {
  try {
    const artist = await prisma.artist.findUnique({ where: { id } });
    return artist;
  } catch {
    return null;
  }
};
