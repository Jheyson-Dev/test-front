import { useQuery } from "@tanstack/react-query";
import { getImagesById } from "../../services/actionsImagenesProducto";

export const useImageId = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["imagenes", id],
    queryFn: () => getImagesById(id),
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
