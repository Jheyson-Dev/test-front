import { useQuery } from "@tanstack/react-query";
import { getTraspasosById } from "../../services/actionsTraspasos";

export const useTraspasosId = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["traspasos", id],
    queryFn: () => getTraspasosById(id),
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
