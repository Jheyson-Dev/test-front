import { useQuery } from "@tanstack/react-query";
import { getComprasById } from "../../services/actionsCompras";

export const useComprasById = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["compras", id],
    queryFn: () => getComprasById(id),
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
