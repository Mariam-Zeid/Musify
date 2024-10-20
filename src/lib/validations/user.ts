import * as z from "zod";

export const updateAccountSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional().or(z.literal("")),
    newPassword: z.string().min(6).optional().or(z.literal("")),
    image: z.any().optional(),
  })
  .refine((data) => !(data.password && !data.newPassword), {
    message: "New password is required if current password is provided!",
    path: ["newPassword"],
  })
  .refine((data) => !(data.newPassword && !data.password), {
    message: "Current password is required if new password is provided!",
    path: ["password"],
  });
export type UpdateAccountSchema = z.infer<typeof updateAccountSchema>;


export const addPlaylistSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.any().optional(),
});
export type AddPlaylistSchema = z.infer<typeof addPlaylistSchema>;

export const addUserTrackSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.any().optional(),
  audio_url: z.any(),
});
export type AddUserTrackSchema = z.infer<typeof addUserTrackSchema>;