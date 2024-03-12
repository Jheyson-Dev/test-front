import { useQuery } from "@tanstack/react-query";
import { getAllDataProduct } from "../services/actionsProduct";

export const useProductAllData = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllDataProduct"],
    queryFn: () => getAllDataProduct(id),
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
