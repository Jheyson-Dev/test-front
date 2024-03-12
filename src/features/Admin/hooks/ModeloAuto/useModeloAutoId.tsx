import { useQuery } from "@tanstack/react-query";
import { getModeloAutoId } from "../../services/actionsModeloAuto";

export const useModeloAutoId = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["modelo-auto", id],
    queryFn: () => getModeloAutoId(id),
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
