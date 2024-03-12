import { useQuery } from "@tanstack/react-query";
import { getAllMarcaModelos } from "../services/actionsModel";

export const useMarcaModel = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["marcaModelos", id],
    queryFn: () => getAllMarcaModelos(id),
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
