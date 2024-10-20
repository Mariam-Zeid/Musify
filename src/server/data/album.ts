"use server";

import { prisma } from "@/server/db";

export const getAllAlbums = async () => {
  try {
    const albums = await prisma.album.findMany();
    return albums;
  } catch {
    return null;
  }
};
export const getAlbumsByArtistId = async (artistId: string) => {
  try {
    const albums = await prisma.album.findMany({
      where: {
        artist_id: artistId,
      },
      include: {
        artist: true,
      },
    });

    return albums;
  } catch (error) {
    console.error("Error fetching albums:", error);
    throw new Error("Could not fetch albums.");
  }
};
export const getAlbumByName = async (name: string) => {
  try {
    const album = await prisma.album.findFirst({ where: { name } });
    return album;
  } catch {
    return null;
  }
};
export const getAlbumById = async (id: string) => {
  try {
    const album = await prisma.album.findUnique({ where: { id }, include: { artist: true } });
    return album;
  } catch {
    return null;
  }
};