import api from "@/utils/axiosConfig";

export const getPlacasAll = async () => {
  const { data } = await api.get("/autos");
  return data.body;
};

export const getPlacaId = async (id) => {
  const { data } = await api.get(`/autos/${id}`);
  return data.body[0];
};
