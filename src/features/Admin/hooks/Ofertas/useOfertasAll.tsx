import { useQuery } from "@tanstack/react-query";
import { getOfertasAll } from "../../services/actionsOfertas";

export const useOfertasAll = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["ofertas"],
    queryFn: getOfertasAll,
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
