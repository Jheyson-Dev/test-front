import { useQuery } from "@tanstack/react-query";
import { getTiendaUsuarioById } from "../../services/actionsTiendaUsuario";

export const useTiendaUsuarioById = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["tienda_usuarios", id],
    queryFn: () => getTiendaUsuarioById(id),
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
