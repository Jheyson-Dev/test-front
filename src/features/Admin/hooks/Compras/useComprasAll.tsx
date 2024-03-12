import { useQuery } from "@tanstack/react-query";
import { getComprasAll } from "../../services/actionsCompras";

export const useComprasAll = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["compras"],
    queryFn: getComprasAll,
  });
  return { data, isLoading, refetch };
};
