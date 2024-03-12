import api from "@/utils/axiosConfig";

export const getInventarioAll = async () => {
  const { data } = await api.get("/reduccion_inventarios");
  return data.body;
};
