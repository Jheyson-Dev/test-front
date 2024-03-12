import api from "@/utils/axiosConfig";

export const getPedidosAll = async () => {
  const { data } = await api.get("/pedidos");
  return data.body;
};

export const getPedidosById = async (id) => {
  const { data } = await api.get(`/pedidos/${id}`);
  return data.body[0];
};
