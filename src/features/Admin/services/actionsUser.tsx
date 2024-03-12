import api from "@/utils/axiosConfig";

export const getUserById = async (id: string) => {
  const { data } = await api.get(`/usuarios/${id}`);
  return data.body[0];
};

export const createUser = async (user) => {
  console.log(user);
  const { data } = await api.post("/usuarios", user);
  return data.body[0];
};

export const updateUser = async (user) => {
  const { data } = await api.put(`/usuarios/${user.id}`, user);
  return data.body[0];
};

export const deleteUser = async (id) => {
  const { data } = await api.delete(`/usuarios/${id}`);
  return data.body[0];
};
export const getUsers = async () => {
  const { data } = await api.get("/usuarios");
  return data.body;
};
