import { useQuery } from "@tanstack/react-query";
import { getPedidosAll } from "../../services/actionsPedidos";

export const usePedidosAll = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["pedidos"],
    queryFn: getPedidosAll,
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
