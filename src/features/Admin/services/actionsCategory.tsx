import api from "@/utils/axiosConfig";

export const getCategoriaAll = async () => {
  const { data } = await api.get("/categorias");
  return data.body;
};

export const getCategoryById = async (id) => {
  const { data } = await api.get(`/categorias/${id}`);
  return data.body[0];
};
