import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlaylistById, getPlaylistTracks, getUserPlaylists } from "@/server/data/playlist";
import { addPlaylist, addTrackToPlaylist, deletePlaylist, removeTrackFromPlaylist } from "@/server/actions/playlists";

export const useUserPlaylists = () => {
  return useQuery({
    queryKey: ["user-playlists"],
    queryFn: async () => await getUserPlaylists(),
    staleTime: 1000 * 60 * 5,
  });
};
export const useUserPlaylistsMutations = () => {
  const queryClient = useQueryClient();

  const addPlaylistMutation = useMutation({
    mutationFn: addPlaylist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-playlists"] });
      queryClient.refetchQueries({ queryKey: ["user-playlists"] });
    },
  });

  const deletePlaylistMutation = useMutation({
    mutationFn: deletePlaylist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-playlists"] });
      queryClient.refetchQueries({ queryKey: ["user-playlists"] });
    },
  });

  return {
    addPlaylist: addPlaylistMutation.mutateAsync,
    deletePlaylist: deletePlaylistMutation.mutateAsync,
  };
};

export const usePlaylist = ({ playlistId }: { playlistId: string }) => {
  return useQuery({
    queryKey: ["playlist", playlistId],
    queryFn: () => getPlaylistById(playlistId),
    enabled: !!playlistId,
    staleTime: 1000 * 60 * 5,
  });
};

export const usePlaylistTracks = ({ playlistId }: { playlistId: string }) => {
  return useQuery({
    queryKey: ["playlist-tracks", playlistId],
    queryFn: async () => await getPlaylistTracks(playlistId),
    enabled: !!playlistId,
    staleTime: 1000 * 60 * 5,
  });
};
export const usePlaylistMutations = () => {
  const queryClient = useQueryClient();

  const addTrackToPlaylistMutation = useMutation({
    mutationFn: ({
      playlistId,
      trackId,
    }: {
      playlistId: string;
      trackId: string;
    }) => addTrackToPlaylist(playlistId, trackId),
    onSuccess: (_, { playlistId }) => {
      queryClient.invalidateQueries({
        queryKey: ["playlist-tracks", playlistId],
      });
    },
  });

  const removeTrackFromPlaylistMutation = useMutation({
    mutationFn: ({
      playlistId,
      trackId,
    }: {
      playlistId: string;
      trackId: string;
    }) => removeTrackFromPlaylist(playlistId, trackId),
    onSuccess: (_, { playlistId }) => {
      queryClient.invalidateQueries({
        queryKey: ["playlist-tracks", playlistId],
      });
    },
  });

  return {
    addTrackToPlaylist: addTrackToPlaylistMutation.mutateAsync,
    removeTrackFromPlaylist: removeTrackFromPlaylistMutation.mutateAsync,
  };
};
