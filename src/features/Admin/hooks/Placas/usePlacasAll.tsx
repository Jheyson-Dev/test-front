import { useQuery } from "@tanstack/react-query";
import { getPlacasAll } from "../../services/actionsPlacas";

export const usePlacasAll = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["placas"],
    queryFn: getPlacasAll,
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
