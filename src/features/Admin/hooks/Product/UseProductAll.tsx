import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "../../services/actionsProduct";

export const UseProductAll = () => {
  const { data, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProduct(),
  });
  return { data, refetch };
};
