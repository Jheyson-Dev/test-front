import { useQuery } from "@tanstack/react-query";
import { getInventarioAll } from "../../services/actionsInventario";

export const useInventarioAll = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["inventario"],
    queryFn: getInventarioAll,
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
