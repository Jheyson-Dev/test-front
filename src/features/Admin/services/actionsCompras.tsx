import api from "@/utils/axiosConfig";

export const getComprasAll = async () => {
  const { data } = await api.get("/compras");
  return data.body;
};

export const getComprasById = async (id) => {
  const { data } = await api.get(`/compras/${id}`);
  return data.body[0];
};
