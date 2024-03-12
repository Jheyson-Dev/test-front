import { useQuery } from "@tanstack/react-query";
import { getAllImages } from "../../services/actionsImagenesProducto";

export const useImagesAll = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["imagenes"],
    queryFn: getAllImages,
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
