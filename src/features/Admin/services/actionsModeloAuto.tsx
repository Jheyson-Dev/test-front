import api from "@/utils/axiosConfig";

export const getModeloAutoAll = async () => {
  const { data } = await api.get("/modelo_autos");
  return data.body;
};

export const getModeloAutoId = async (id) => {
  const { data } = await api.get(`/modelo_autos/${id}`);
  return data.body[0];
};
