import { deleteMemberById } from "@/server/actions/user";
import { getAllMembers } from "@/server/data/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
