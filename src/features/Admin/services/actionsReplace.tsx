import api from "@/utils/axiosConfig";

export const getAllReplace = async () => {
  const { data } = await api.get("/reemplazos");
  return data.body;
};

export const getReplaceById = async (id) => {
  const { data } = await api.get(`/reemplazos/${id}`);
  return data.body[0];
};
