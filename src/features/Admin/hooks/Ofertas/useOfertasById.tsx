import { useQuery } from "@tanstack/react-query";
import { getOfertasById } from "../../services/actionsOfertas";

export const useOfertasById = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["ofertas"],
    queryFn: () => getOfertasById(id),
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
