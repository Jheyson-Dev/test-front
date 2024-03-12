import { useQuery } from "@tanstack/react-query";
import { getTraspasosAll } from "../../services/actionsTraspasos";

export const useTraspasosAll = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["traspasos"],
    queryFn: getTraspasosAll,
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
