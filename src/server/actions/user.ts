"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/server/db";
import { getUserById } from "@/server/data/user";
import { deleteFile } from "@/lib/supabaseBuckets";
import {
  updateAccountSchema,
  UpdateAccountSchema,
} from "@/lib/validations/user";
import { currentUser } from "../currentUser";
import { compare, hash } from "bcryptjs";
import { getUserPlaylists } from "@/server/data/playlist";

export const updateUser = async (values: UpdateAccountSchema) => {
  const validatedFields = updateAccountSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, password, newPassword, image } = validatedFields.data;

  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized" };
  }

  const existingUser = await getUserById(user.id);

  if (!existingUser) {
    return { error: "Unauthorized" };
  }

  if (name) {
    const updatedName = name.toLowerCase();
    await prisma.user.update({
      where: { id: existingUser.id },
      data: { name: updatedName },
    });
  }

  if (password && newPassword && existingUser.password) {
    const passwordsMatch = await compare(password, existingUser.password);

    if (!passwordsMatch) {
      return { error: "The current password is incorrect" };
    }

    if (password === newPassword) {
      return {
        error: "The new password cannot be the same as the current one",
      };
    }

    const hashedPassword = await hash(newPassword, 10);

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });
  }

  if (image) {
    // Remove the old image if it exists
    const oldImageUrl = existingUser.image;
    if (oldImageUrl) {
      const { error: removeError } = await deleteFile(oldImageUrl, "users");
      if (removeError) {
        return { error: `Old image removal failed: ${removeError}` };
      }
    }

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { image },
    });
  }

  redirect("/profile");
};
export const deleteAccount = async (id: string) => {
  const existingUser = await getUserById(id);

  if (!existingUser) {
    return { error: "User not found!" };
  }

  const imageUrl = existingUser.image;

  await prisma.$transaction(async (prisma) => {
    const playlists = await getUserPlaylists();

    if (!playlists) {
      return { error: "The user has no playlists" };
    }

    const playlistsImageUrls = playlists.map((playlist) => playlist.image);

    // Delete all the user's favorite tracks
    await prisma.favoriteTrack.deleteMany({
      where: { user_id: id },
    });

    // Delete all the user's playlists
    await prisma.playlist.deleteMany({
      where: { user_id: id },
    });

    // Delete all the user's listening history
    await prisma.userListeningHistory.deleteMany({
      where: { user_id: id },
    });

    // Delete the user
    await prisma.user.delete({
      where: { id },
    });

    for (const playlistImageUrl of playlistsImageUrls) {
      if (playlistImageUrl) {
        const { error: removeAlbumImageError } = await deleteFile(
          playlistImageUrl,
          "users"
        );
        if (removeAlbumImageError) {
          console.error(
            `Playlist image deletion failed: ${removeAlbumImageError}`
          );
        }
      }
    }
  });

  if (imageUrl) {
    const { error: removeError } = await deleteFile(imageUrl, "users");
    if (removeError) {
      return {
        error: `User deleted, but image deletion failed: ${removeError}`,
      };
    }
  }

  redirect("/");
};
export const updateListeningHistory = async (trackId: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized" };
  }

  await prisma.userListeningHistory.upsert({
    where: {
      user_id_track_id: {
        user_id: user.id,
        track_id: trackId,
      },
    },
    update: {
      playCount: {
        increment: 1,
      },
    },
    create: {
      user_id: user.id,
      track_id: trackId,
      playCount: 1,
    },
  });
};
export const generateMonthlySummaryEmail = (
  tracks: { name: string; playCount: number }[],
  totalPlayCount: number
) => {
  const trackListHtml = tracks
    .map((track) => `<p>${track.name}: ${track.playCount} plays</p>`)
    .join("");

  return `
    <h1>Monthly Listening Summary</h1>
    <p>Here’s a summary of your listening activity for the month:</p>
    ${trackListHtml}
    <p><strong>Total Plays:</strong> ${totalPlayCount}</p>
  `;
};
export const deleteMemberById = async (id: string) => {
  return await prisma.user.delete({
    where: { id },
  });
};
