import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const { data: session, update } = useSession();
  return { user: session?.user, update };
};

export const useCurrentRole = () => {
  const { data: session } = useSession();
  return { role: session?.user?.role };
};
