import { useQuery } from "@tanstack/react-query";
import { getTiendaById } from "../../services/actionsTienda";

export const useTiendaId = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["tiendas", id],
    queryFn: () => getTiendaById(id),
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
