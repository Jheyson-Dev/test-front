import api from "@/utils/axiosConfig";

export const getIngresosAll = async () => {
  const { data } = await api.get("/ingresos");
  return data.body;
};
