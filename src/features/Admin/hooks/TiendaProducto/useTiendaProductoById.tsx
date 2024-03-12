import { useQuery } from "@tanstack/react-query";
import { getTiendaProductId } from "../../services/actionsTiendaProducto";

export const useTiendaProductoById = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["tienda_producto", id],
    queryFn: () => getTiendaProductId(id),
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
