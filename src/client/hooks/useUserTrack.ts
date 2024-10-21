import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserTrackById, getUserTracks } from "@/server/data/userTrack";
import { addUserTrack, deleteUserTrack } from "@/server/actions/userTracks";

export const useUserTracks = () => { return useQuery({
  queryKey: ["user-tracks"],
  queryFn: async () => await getUserTracks(),
  staleTime: 1000 * 60 * 5,
});}

export const useUserTrackById = ({ trackId }: { trackId: string }) => {
  return useQuery({
    queryKey: ["track", trackId],
    queryFn: async () => await getUserTrackById(trackId),
    enabled: !!trackId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUserTrackMutations = () => {
  const queryClient = useQueryClient();

  const addTrackMutation = useMutation({
    mutationFn: addUserTrack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-tracks"] });
      queryClient.refetchQueries({ queryKey: ["user-tracks"] });
    },
  });

  const deleteTrackMutation = useMutation({
    mutationFn: deleteUserTrack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-tracks"] });
      queryClient.refetchQueries({ queryKey: ["user-tracks"] });
    },
  });

  return {
    addTrack: addTrackMutation.mutateAsync,
    deleteTrack: deleteTrackMutation.mutateAsync,
  };
};