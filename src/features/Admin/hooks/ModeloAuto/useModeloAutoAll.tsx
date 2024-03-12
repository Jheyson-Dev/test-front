import { useQuery } from "@tanstack/react-query";
import { getModeloAutoAll } from "../../services/actionsModeloAuto";
export const useModeloAutoAll = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["modelo-autos"],
    queryFn: getModeloAutoAll,
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
