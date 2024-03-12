import { useQuery } from "@tanstack/react-query";
import { getAplicacionById } from "../../services/actionsAplication";

export const useAplicationId = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["aplicaciones", id],
    queryFn: () => getAplicacionById(id),
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
