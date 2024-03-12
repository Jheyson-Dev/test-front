import api from "@/utils/axiosConfig";

export const getTiendaProductoAll = async () => {
  const { data } = await api.get("/tienda_productos");
  return data.body;
};

export const getTiendaProductId = async (id) => {
  const { data } = await api.get(`/tienda_productos/${id}`);
  return data;
};
