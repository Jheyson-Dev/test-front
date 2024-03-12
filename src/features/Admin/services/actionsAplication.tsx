import api from "@/utils/axiosConfig";

export const getAplicacionAll = async () => {
  const { data } = await api.get("/aplicaciones");
  return data.body;
};

export const getAplicacionById = async (id) => {
  const { data } = await api.get(`/aplicaciones/${id}`);
  return data.body;
};
