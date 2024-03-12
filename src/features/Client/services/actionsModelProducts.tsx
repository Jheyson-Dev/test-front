import api from "@/utils/axiosConfig";

export const getProductByModel = async (id) => {
  const { data } = await api.get(`/modelos_marca/${id}`);
  return data;
};
