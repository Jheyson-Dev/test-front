import api from "@/utils/axiosConfig";

export const getAllImages = async () => {
  const { data } = await api.get("/img_productos");
  return data.body;
};

export const getImagesById = async (id) => {
  const { data } = await api.get(`/img_productos/${id}`);
  return data.body[0];
};
