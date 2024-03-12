import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useUser } from "../../hooks/useUserId";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/axiosConfig";
import { toast } from "sonner";
import { Label } from "@radix-ui/react-dropdown-menu";

import { useEffect, useState } from "react";
import { useTiendaUsuarioById } from "../../hooks/TiendaUsuario/useTiendaUsuarioById";

// Shadcn
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useUserAll } from "../../hooks/useUserAll";
import { useTiendaAll } from "../../hooks/Tienda/useTiendaAll";
import { Loading } from "../../components/Loading";

export const EditUsuarioTienda = () => {
  const { id } = useParams();
  const { data } = useTiendaUsuarioById(id);

  const navigate = useNavigate();

  const { data: user } = useUserAll();
  const { data: tienda } = useTiendaAll();

  const [form, setForm] = useState({
    id_usuario: "",
    id_tienda: "",
  });

  const editMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.put(`/tienda_usuarios/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Asignacion actualizada correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/user-store");
    },
  });

  // Manejar el submit del formulario
  const submit = (e) => {
    e.preventDefault();

    // console.log(form);
    editMutation.mutate(form); // Fix: Pass form data as argument to mutate function
  };
  useEffect(() => {
    if (data) {
      const copy = { ...data };
      delete copy.id_tienda_usuario;
      setForm(copy);
    }
  }, [data]);

  return (
    <div className="">
      {editMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Editar Asignacion</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        {data && (
          <form onSubmit={submit} className="">
            <div className="flex flex-col gap-10 w-full justify-center">
              <div className="w-full flex gap-8">
                <div className="w-1/2 grid gap-1.5 font-semibold">
                  Usuario:
                  <Select
                    onValueChange={(e) => {
                      setForm({ ...form, id_usuario: e });
                    }}
                    defaultValue={data.id_usuario.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Usuarios</SelectLabel>

                        {user?.map((item, index) => {
                          return (
                            <SelectItem
                              key={index}
                              value={`${item.id_usuario}`}
                            >
                              {item.username}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-1/2 grid gap-1.5 font-semibold">
                  Tienda:
                  <Select
                    onValueChange={(e) => setForm({ ...form, id_tienda: e })}
                    defaultValue={data.id_tienda.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Tiendas</SelectLabel>
                        {tienda?.map((item, index) => {
                          return (
                            <SelectItem key={index} value={`${item.id_tienda}`}>
                              {item.direccion}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className=" flex justify-end gap-8 w-full">
                <Button variant={"default"} type="submit">
                  Guardar
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={() => navigate("/admin/user-store")}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
