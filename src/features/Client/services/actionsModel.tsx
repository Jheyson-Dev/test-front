import api from "@/utils/axiosConfig";

export const getAllMarcaModelos = async (id) => {
  const { data } = await api.get(`/marca_autos/${id}`);
  // console.log(data.body[0]);
  // console.log(data.body[0].id_marca_auto);
  return data.body[0];
};
