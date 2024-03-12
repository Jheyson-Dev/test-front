import { useQuery } from "@tanstack/react-query";
import { getTiendaAll } from "../../services/actionsTienda";

export const useTiendaAll = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["tiendas"],
    queryFn: getTiendaAll,
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
