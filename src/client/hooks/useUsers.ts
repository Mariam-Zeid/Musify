import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteMemberById } from "@/server/actions/user";
import { getAllMembers, getUserListeningHistory } from "@/server/data/user";

export const useAllMembers = () => {
  return useQuery({
    queryKey: ["all-members"],
    queryFn: async () => await getAllMembers(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await deleteMemberById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-members"] });
    },
  });
};

export const useUserListeningHistory = () => {
  return useQuery({
    queryKey: ["user-listening-history"], // Cache the query by userId
    queryFn: async () => await getUserListeningHistory(),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};