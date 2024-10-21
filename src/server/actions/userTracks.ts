"use server";

import { prisma } from "@/server/db";
import { addUserTrackSchema, AddUserTrackSchema } from "@/lib/validations/user";
import { currentUser } from "@/server/currentUser";
import { getUserTrackByName } from "@/server/data/userTrack";

export async function addUserTrack(values: AddUserTrackSchema) {
  const isValidated = addUserTrackSchema.safeParse(values);

  if (!isValidated.success) {
    return { error: "Invalid credentials!" };
  }

  const user = await currentUser();
  if (!user || !user.id) {
    return { error: "Unauthorized" };
  }

  const { name, image, audio_url } = isValidated.data;

  const existingTrack = await getUserTrackByName(name.toLowerCase());

  if (existingTrack) {
    return { error: "Track already exists!" };
  }

  await prisma.userTrack.create({
    data: {
      name: name.toLowerCase(),
      image: image ? image : null,
      audio_url,
      user_id: user.id,
    },
  });
}
export async function deleteUserTrack(id: string) {
  await prisma.userTrack.delete({
    where: { id },
  });
  return { message: "Track deleted successfully." };
}
