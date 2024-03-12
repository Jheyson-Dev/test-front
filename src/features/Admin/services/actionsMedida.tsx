import api from "@/utils/axiosConfig";

export const getMedidaAll = async () => {
  const { data } = await api.get("/medidas");
  return data.body;
};
