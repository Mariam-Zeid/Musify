"use server";

import { prisma } from "@/server/db";
import { currentUser } from "@/server/currentUser";

export async function getUserTracks() {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return { error: "Unauthorized" };
    }
    const userId = user.id;
    const tracks = await prisma.userTrack.findMany({
      where: { user_id: userId },
    });
    return tracks;
  } catch {
    return null;
  }
}

export async function getUserTrackById(id: string) {
  try {
    const user = await currentUser();
    const track = await prisma.userTrack.findFirst({
      where: { id, user_id: user?.id },
      include: { user: true },
    });
    return track;
  } catch (error) {
    console.error("Error fetching user track:", error);
    return null;
  }
}

export const getUserTrackByName = async (name: string) => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return { error: "Unauthorized" };
    }
    const userId = user.id;
    const track = await prisma.userTrack.findFirst({
      where: { name, user_id: userId },
    });
    return track;
  } catch {
    return null;
  }
};
