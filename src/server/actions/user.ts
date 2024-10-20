"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/server/db";
import { getUserById } from "@/server/data/user";
import { deleteFile } from "@/lib/supabaseBuckets";
import { updateAccountSchema, UpdateAccountSchema } from "@/lib/validations/user";
import { currentUser } from "../currentUser";
import { compare, hash } from "bcryptjs";

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
      const { error: removeError } = await deleteFile(
        oldImageUrl,
        "users"
      );
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

  await prisma.user.delete({
    where: { id },
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
