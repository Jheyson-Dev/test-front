import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/actionsUser";

export const useUserAll = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUsers(),
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
