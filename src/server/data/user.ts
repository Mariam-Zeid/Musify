"use server";

import { prisma } from "@/server/db";
import { UserRole } from "@prisma/client";
import { currentUser } from "../currentUser";

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
export const getUserByName = async (name: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { name } });
    return user;
  } catch {
    return null;
  }
}
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
// export const getMonthlyUserStats = async () => {
//   const users = await prisma.user.findMany({
//     include: {
//       userListeningHistory: {
//         select: {
//           track: { select: { name: true } },
//           playCount: true,
//         },
//       },
//     },
//   });

//   return users.map((user) => {
//     const totalPlayCount = user.userListeningHistory.reduce(
//       (sum, history) => sum + history.playCount,
//       0
//     );

//     const tracks = user.userListeningHistory.map((history) => ({
//       name: history.track?.name ?? "Unknown Track",
//       playCount: history.playCount,
//     }));

//     return {
//       email: user.email,
//       tracks,
//       totalPlayCount,
//     };
//   });
// };
export const getLoggedInUserStats = async () => {
  const loggedUser = await currentUser();
  const loggedInUserId = loggedUser?.id;
  const user = await prisma.user.findUnique({
    where: { id: loggedInUserId },
    include: {
      userListeningHistory: {
        select: {
          track: { select: { name: true } },
          playCount: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const totalPlayCount = user.userListeningHistory.reduce(
    (sum, history) => sum + history.playCount,
    0
  );

  const tracks = user.userListeningHistory.map((history) => ({
    name: history.track?.name ?? "Unknown Track",
    playCount: history.playCount ?? 0,
  }));

  return {
    email: user.email,
    tracks,
    totalPlayCount,
  };
};
export const getUserListeningHistory = async () => {
  const user = await currentUser();
  const userId = user?.id;
  try {
    const history = await prisma.userListeningHistory.findMany({
      where: {
        user_id: userId,
      },
      include: {
        track: {
          select: {
            name: true,
            year: true,
          },
        },
      },
    });

    const tracks = history.map((entry) => ({
      name: entry.track.name,
      year: entry.track.year,
    }));

    return tracks;
  } catch (error) {
    console.error("Error fetching user listening history:", error);
    throw new Error("Failed to retrieve listening history.");
  }
};
