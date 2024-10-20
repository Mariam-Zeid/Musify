import * as z from "zod";

export const addTrackSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.any(),
  audio_url: z.any(),
  album_id: z.string(),
  artist_id: z.string(),
});

export type AddTrackSchema = z.infer<typeof addTrackSchema>;
