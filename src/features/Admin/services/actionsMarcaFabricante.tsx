import api from "@/utils/axiosConfig";

export const getMarcaFabricanteAll = async () => {
  const { data } = await api.get("/marca-fabricantes");
  return data.body;
};
