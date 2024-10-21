import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserFavorites } from "@/server/data/favorites";
import {
  likeTrack,
  unlikeTrack,
} from "@/server/actions/favorites";

export const useUserFavorites = () =>
  useQuery({
    queryKey: ["user-favorites"],
    queryFn: async () => await getUserFavorites(),
    staleTime: 1000 * 60 * 5,
  });

export const useFavoriteMutations = () => {
  const queryClient = useQueryClient();

  const likeTrackMutation = useMutation({
    mutationFn: likeTrack,
    onSuccess: () => {
      // Invalidate and refetch queries related to user favorites
      queryClient.invalidateQueries({ queryKey: ["user-favorites"] });
      queryClient.refetchQueries({ queryKey: ["user-favorites"] });
    },
    onError: (error) => {
      console.error("Error liking track:", error);
    },
  });

  const unlikeTrackMutation = useMutation({
    mutationFn: unlikeTrack,
    onSuccess: () => {
      // Invalidate and refetch queries related to user favorites
      queryClient.invalidateQueries({ queryKey: ["user-favorites"] });
      queryClient.refetchQueries({ queryKey: ["user-favorites"] });
    },
    onError: (error) => {
      console.error("Error unliking track:", error);
    },
  });

  return {
    likeTrack: likeTrackMutation.mutateAsync,
    unlikeTrack: unlikeTrackMutation.mutateAsync,
  };
};
