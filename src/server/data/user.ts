"use server";

import { prisma } from "@/server/db";
import { UserRole } from "@prisma/client";

export const getAllMembers = async () => {
  try {
    const members = await prisma.user.findMany({
      where: { role: UserRole.USER },
    });
    return members;
  } catch {
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};
export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await prisma.account.findFirst({
      where: { userId },
    });

    return account;
  } catch {
    return null;
  }
};
export const getMonthlyUserStats = async () => {
  const users = await prisma.user.findMany({
    include: {
      userListeningHistory: {
        select: {
          track: { select: { name: true } },
          playCount: true,
        },
      },
    },
  });

  return users.map((user) => {
    const totalPlayCount = user.userListeningHistory.reduce(
      (sum, history) => sum + history.playCount,
      0
    );

    const tracks = user.userListeningHistory.map((history) => ({
      name: history.track?.name ?? "Unknown Track",
      playCount: history.playCount,
    }));

    return {
      email: user.email,
      tracks,
      totalPlayCount,
    };
  });
};
