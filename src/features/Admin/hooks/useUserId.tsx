import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/actionsUser";
interface Props {
  id: string;
}

export const useUser = ({ id }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  });
  return { data, isLoading };
};
