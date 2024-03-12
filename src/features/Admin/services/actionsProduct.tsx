import api from "@/utils/axiosConfig";

export const getAllProduct = async () => {
  const { data } = await api.get("/productos");
  return data.body;
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/productos/${id}`);
  return data.body[0];
};
