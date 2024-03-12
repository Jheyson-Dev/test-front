import { useQuery } from "@tanstack/react-query";
import { getProductByModel } from "../services/actionsModelProducts";

export const useModelProduct = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["modelProduct", id],
    queryFn: () => getProductByModel(id),
  });
  return { data, isLoading, refetch };
};
