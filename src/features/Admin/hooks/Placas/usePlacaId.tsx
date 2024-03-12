import { getPlacaId } from "../../services/actionsPlacas";
import { useQuery } from "@tanstack/react-query";


export const usePlacaId = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["placas", id],
    queryFn: () => getPlacaId(id),
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
