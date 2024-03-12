import { useQuery } from "@tanstack/react-query";
import { searchCodeProduct } from "../services/actionsProduct";

export const useCodeProduct = (code) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["product", code],
    queryFn: () => searchCodeProduct(code),
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
