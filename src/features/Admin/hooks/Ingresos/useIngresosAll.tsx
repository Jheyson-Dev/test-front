import { useQuery } from "@tanstack/react-query";
import { getIngresosAll } from "../../services/actionsIngresos";

export const useIngresosAll = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["ingresos"],
    queryFn: getIngresosAll,
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
