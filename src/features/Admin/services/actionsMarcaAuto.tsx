import api from "@/utils/axiosConfig";

export const getAllMarcaAutos = async () => {
  const { data } = await api.get("/marca_autos");
  return data.body;
};

export const getMarcaAutosById = async (id) => {
  const { data } = await api.get(`/marca_autos/${id}`);
  return data.body[0];
};
