import { useQuery } from "@tanstack/react-query";
import { getCategoriaAll } from "../../services/actionsCategory";

export const useCategoriaAll = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["categoria"],
    queryFn: () => getCategoriaAll(),
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
