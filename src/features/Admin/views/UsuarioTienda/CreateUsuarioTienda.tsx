import { Button } from "@/components/ui/button";
import api from "@/utils/axiosConfig";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

export const CreateUsuarioTienda = () => {
  const navigate = useNavigate();

  const { data: user } = useUserAll();
  const { data: tienda } = useTiendaAll();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id_usuario: "",
      id_tienda: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/tienda_usuarios", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Usuario creado correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/user-store");
    },
  });

  const onSubmit = (data) => {
    createMutation.mutate(data);
  };
  return (
    <div className="">
      {createMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Asignar Tienda</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex flex-col gap-10 items-center w-full justify-center">
            <div className="w-full flex gap-8">
              <Controller
                name="id_usuario"
                control={control}
                rules={{
                  required: "El usuario es requerido",
                }}
                render={({ field }) => {
                  return (
                    <div className="w-1/3 grid gap-1.5 font-semibold">
                      Usuario:
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
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
                      {errors.id_usuario && (
                        <div className="text-red-500 text-xs">
                          {errors.id_usuario.message}
                        </div>
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="id_tienda"
                control={control}
                rules={{
                  required: "La tienda es requerido",
                }}
                render={({ field }) => {
                  return (
                    <div className="w-1/3 grid gap-1.5 font-semibold">
                      Tienda:
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Tiendas</SelectLabel>
                            {tienda?.map((item, index) => {
                              return (
                                <SelectItem
                                  key={index}
                                  value={`${item.id_tienda}`}
                                >
                                  {item.direccion}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {errors.id_tienda && (
                        <div className="text-red-500 text-xs">
                          {errors.id_tienda.message}
                        </div>
                      )}
                    </div>
                  );
                }}
              />
            </div>

            <div className=" flex justify-end gap-8 w-full">
              <Button type="submit">Guardar</Button>
              <Button
                variant={"destructive"}
                onClick={() => navigate("/admin/user-store")}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
