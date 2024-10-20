import * as z from "zod";

export const addArtistSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.any()
});

export type AddArtistSchema = z.infer<typeof addArtistSchema>;
