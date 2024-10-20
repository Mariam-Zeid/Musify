import * as z from "zod";

export const addAlbumSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.any(),
  artist_id: z.string(),
});

export type AddAlbumSchema = z.infer<typeof addAlbumSchema>;
