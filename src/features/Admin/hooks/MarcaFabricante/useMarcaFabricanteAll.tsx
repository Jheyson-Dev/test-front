import { useQuery } from "@tanstack/react-query";
import { getMarcaFabricanteAll } from "../../services/actionsMarcaFabricante";

export const useMarcaFabricanteAll = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["marca_fabricantes"],
    queryFn: getMarcaFabricanteAll,
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
