import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getAllTracks,
  getTrackById,
  getTracksByAlbumId,
  getTracksByArtistName,
  getTracksByTrackName,
} from "@/server/data/track";
import { addTrack, deleteTrack } from "@/server/actions/track";

export const useAllTracks = () => {
  return useQuery({
    queryKey: ["all-tracks"],
    queryFn: async () => await getAllTracks(),
    staleTime: 1000 * 60 * 5,
  });
}
export const useTracksByNameOrArtist = ({ query }: { query: string }) => {
  return useQuery({
    queryKey: ["tracks", query],
    queryFn: async () => {
      const trackResults = await getTracksByTrackName(query);
      const artistResults = await getTracksByArtistName(query);
      return [...trackResults, ...artistResults];
    },
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
  });
};
export const useAlbumTracks = ({ albumId }: { albumId: string }) => {
  return useQuery({
    queryKey: ["album-tracks"],
    queryFn: async () => await getTracksByAlbumId(albumId),
    staleTime: 1000 * 60 * 5,
  });
};
export const useTrackById = ({ trackId }: { trackId: string }) => {
  return useQuery({
    queryKey: ["track", "TrackById", trackId],
    queryFn: async () => await getTrackById(trackId),
    enabled: !!trackId,
    staleTime: 1000 * 60 * 5,
  });
};
export const useTrackMutations = () => {
  const queryClient = useQueryClient();

  const addTrackMutation = useMutation({
    mutationFn: addTrack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["album-tracks"] });
      queryClient.refetchQueries({ queryKey: ["album-tracks"] });
    },
  });

  const deleteTrackMutation = useMutation({
    mutationFn: deleteTrack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["album-tracks"] });
      queryClient.refetchQueries({ queryKey: ["album-tracks"] });
    },
  });

  return {
    addTrack: addTrackMutation.mutateAsync,
    deleteTrack: deleteTrackMutation.mutateAsync,
  };
};
