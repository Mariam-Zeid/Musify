"use server";

import { prisma } from "@/server/db";
import { getUserById } from "@/server/data/user";
import { deleteFile } from "@/lib/supabaseBuckets";

export const deleteAccount = async (id: string) => {
  const existingUser = await getUserById(id);

  if (!existingUser) {
    return { error: "User not found!" };
  }

  const imageUrl = existingUser.image;

  await prisma.user.delete({
    where: { id },
  });

  if (imageUrl) {
    const { error: removeError } = await deleteFile(imageUrl, "user-images");
    if (removeError) {
      return {
        error: `User deleted, but image deletion failed: ${removeError}`,
      };
    }
  }
  return { success: "Account and session deleted successfully!" };
};
