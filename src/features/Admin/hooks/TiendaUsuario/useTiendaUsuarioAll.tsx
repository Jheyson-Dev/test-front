import { useQuery } from "@tanstack/react-query";
import { getTiendaUsuarioAll } from "../../services/actionsTiendaUsuario";

export const useTiendaUsuarioAll = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["tienda_usuarios"],
    queryFn: getTiendaUsuarioAll,
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
