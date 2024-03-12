import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../services/actionsProduct";

export const useProductId = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: ["producto", id],
    queryFn: () => getProductById(id),
  });
  return {
    data,
    isLoading,
  };
};
