import { useQuery } from "@tanstack/react-query";
import { getPaisOrigenAll } from "../../services/actionsPaisOrigen";

export const usePaisOrigenAll = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["pais-origenes"],
    queryFn: getPaisOrigenAll,
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
