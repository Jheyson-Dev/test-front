import { useQuery } from "@tanstack/react-query";
import { getReplaceById } from "../../services/actionsReplace";

export const useReemplazoId = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["reemplazos", id],
    queryFn: () => getReplaceById(id),
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
