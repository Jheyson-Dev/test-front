import { useQuery } from "@tanstack/react-query";
import { getMedidaAll } from "../../services/actionsMedida";

export const useMedidaAll = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["medidas"],
    queryFn: getMedidaAll,
  });
  return { data, isLoading, refetch };
};
