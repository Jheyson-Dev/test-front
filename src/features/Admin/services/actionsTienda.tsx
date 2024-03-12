import api from "@/utils/axiosConfig";

export const getTiendaAll = async () => {
  const { data } = await api.get("/tiendas");
  return data.body;
};

export const getTiendaById = async (id) => {
  const { data } = await api.get(`/tiendas/${id}`);
  return data.body[0];
};
