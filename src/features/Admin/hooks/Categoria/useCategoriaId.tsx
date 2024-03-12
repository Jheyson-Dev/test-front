import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "../../services/actionsCategory";

export const useCategoriaId = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["categoria", id],
    queryFn: () => getCategoryById(id),
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
