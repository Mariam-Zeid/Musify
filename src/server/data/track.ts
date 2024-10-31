"use server";

import { prisma } from "@/server/db";

export const getAllTracks = async () => {
  try {
    const tracks = await prisma.track.findMany({
      include: { artist: true, album: true },
    });
    return tracks;
  } catch {
    return null;
  }
};
export const getTracksByTrackName = async (name: string) => {
  try {
    const tracks = await prisma.track.findMany({
      where: { name: { contains: name, mode: "insensitive" } },
      include: { artist: true, album: true },
    });
    return tracks || [];
  } catch {
    return [];
  }
};
export const getTracksByArtistName = async (name: string) => {
  try {
    const tracks = await prisma.track.findMany({
      where: { artist: { name: { contains: name, mode: "insensitive" } } },
      include: { artist: true, album: true },
    });
    return tracks || [];
  } catch {
    return [];
  }
};
export const getTrackById = async (id: string) => {
  try {
    const track = await prisma.track.findUnique({
      where: { id },
      include: { artist: true, album: true },
    });
    return track;
  } catch {
    return null;
  }
};
export const getTrackByName = async (name: string) => {
  try {
    const track = await prisma.track.findFirst({
      where: { name },
      include: { artist: true, album: true },
    });
    return track;
  } catch {
    return null;
  }
};
export const getTracksByAlbumId = async (albumId: string) => {
  try {
    const tracks = await prisma.track.findMany({
      where: { album_id: albumId },
      include: { artist: true, album: true },
    });
    return tracks;
  } catch {
    return null;
  }
};
