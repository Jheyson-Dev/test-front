import api from "@/utils/axiosConfig";

export const getOfertasAll = async () => {
  const { data } = await api.get("/ofertas");
  return data.body;
};

export const getOfertasById = async (id) => {
  const { data } = await api.get(`/ofertas/${id}`);
  return data.body[0];
};
