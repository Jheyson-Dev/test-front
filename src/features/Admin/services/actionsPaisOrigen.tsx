import api from "@/utils/axiosConfig";

export const getPaisOrigenAll = async () => {
  const { data } = await api.get("/pais-origenes");
  return data.body;
};
