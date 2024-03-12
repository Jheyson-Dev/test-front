import api from "@/utils/axiosConfig";

export const getTiendaUsuarioAll = async () => {
  const { data } = await api.get("/tienda_usuarios");
  return data.body;
};

export const getTiendaUsuarioById = async (id) => {
  const { data } = await api.get(`/tienda_usuarios/${id}`);
  return data.body[0];
};
