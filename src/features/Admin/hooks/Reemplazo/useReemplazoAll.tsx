import { useQuery } from "@tanstack/react-query";
import { getAllReplace } from "../../services/actionsReplace";

export const useReemplazoAll = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["reemplazos"],
    queryFn: getAllReplace,
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
