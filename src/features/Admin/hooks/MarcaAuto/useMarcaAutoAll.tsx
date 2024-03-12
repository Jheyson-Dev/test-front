import { useQuery } from "@tanstack/react-query";
import { getAllMarcaAutos } from "../../services/actionsMarcaAuto";

export const useMarcaAutoAll = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["marca-autos"],
    queryFn: getAllMarcaAutos,
  });
  return { data, isLoading, refetch };
};
