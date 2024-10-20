import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getAllArtists, getArtistById } from "@/server/data/artist";
import { addArtist, deleteArtist } from "@/server/actions/artist";

export const useArtists = () => {
  return useQuery({
    queryKey: ["all-artists"],
    queryFn: async () => await getAllArtists(),
    staleTime: 1000 * 60 * 5,
  });
};
export const useArtist = ({ artistId }: { artistId: string }) => {
  return useQuery({
    queryKey: ["artist", artistId],
    queryFn: async () => await getArtistById(artistId),
    enabled: !!artistId,
    staleTime: 1000 * 60 * 5,
  });
};
export const useArtistMutations = () => {
  const queryClient = useQueryClient();

  const addArtistMutation = useMutation({
    mutationFn: addArtist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-artists"] });
      queryClient.refetchQueries({ queryKey: ["all-artists"] });
    },
  });

  const deleteArtistMutation = useMutation({
    mutationFn: deleteArtist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-artists"] });
      queryClient.refetchQueries({ queryKey: ["all-artists"] });
    },
  });

  return {
    addArtist: addArtistMutation.mutateAsync,
    deleteArtist: deleteArtistMutation.mutateAsync,
  };
};
