import api from "@/utils/axiosConfig";

export const getAllDataProduct = async (id) => {
  const { data } = await api.get(`/productos/${id}`);
  return data.body[0];
};

export const searchCodeProduct = async (code) => {
  const { data } = await api.get(`/buscar_productos/?busqueda=${code}`);
  return data;
};
