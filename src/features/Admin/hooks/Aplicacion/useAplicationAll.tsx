import { useQuery } from "@tanstack/react-query";
import { getAplicacionAll } from "../../services/actionsAplication";
export const useAplicationAll = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["aplicaciones"],
    queryFn: getAplicacionAll,
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
