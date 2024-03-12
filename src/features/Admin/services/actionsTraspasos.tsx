import api from "@/utils/axiosConfig";

export const getTraspasosAll = async () => {
  const { data } = await api.get("/traspasos");
  return data.body;
};

export const getTraspasosById = async (id) => {
  const { data } = await api.get(`/traspasos/${id}`);
  return data.body;
};
