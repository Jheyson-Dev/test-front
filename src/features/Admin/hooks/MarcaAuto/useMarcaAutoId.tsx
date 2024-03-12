import { useQuery } from "@tanstack/react-query";
import { getMarcaAutosById } from "../../services/actionsMarcaAuto";

export const useMarcaAutoId = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["marca-auto", id],
    queryFn: () => getMarcaAutosById(id),
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
