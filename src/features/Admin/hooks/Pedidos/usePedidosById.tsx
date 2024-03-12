import { useQuery } from "@tanstack/react-query";
import { getPedidosById } from "../../services/actionsPedidos";

export const usePedidosById = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["pedidos", id],
    queryFn: () => getPedidosById(id),
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
