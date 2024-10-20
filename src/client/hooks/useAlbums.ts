import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { addAlbum, deleteAlbum } from "@/server/actions/album";
import { getAlbumById, getAlbumsByArtistId } from "@/server/data/album";

export const useArtistAlbums = ({ artistId }: { artistId: string }) => {
  return useQuery({
    queryKey: ["artist-albums", artistId],
    queryFn: async () => await getAlbumsByArtistId(artistId),
    enabled: !!artistId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useArtistAlbum = ({ albumId }: { albumId: string }) => {
  return useQuery({
    queryKey: ["artist-album", albumId],
    queryFn: async () => await getAlbumById(albumId),
    enabled: !!albumId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useAlbumsMutations = () => {
  const queryClient = useQueryClient();

  const addAlbumMutation = useMutation({
    mutationFn: addAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artist-albums"] });
      queryClient.refetchQueries({ queryKey: ["artist-albums"] });
    },
  });

  const deleteAlbumMutation = useMutation({
    mutationFn: deleteAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artist-albums"] });
      queryClient.refetchQueries({ queryKey: ["artist-albums"] });
    },
  });

  return {
    addAlbum: addAlbumMutation.mutateAsync,
    deleteAlbum: deleteAlbumMutation.mutateAsync,
  };
};
