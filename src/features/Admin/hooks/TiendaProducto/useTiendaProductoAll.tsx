import { useQuery } from "@tanstack/react-query";
import { getTiendaProductoAll } from "../../services/actionsTiendaProducto";

export const useTiendaProductoAll = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["tienda_producto"],
    queryFn: getTiendaProductoAll,
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
