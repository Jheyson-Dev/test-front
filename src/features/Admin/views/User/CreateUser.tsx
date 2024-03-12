import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/utils/axiosConfig";
import { Label } from "@/components/ui/label";
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
import { Loading } from "../../components/Loading";

export const CreateUser = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      rol: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/usuarios", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Usuario creado correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/user");
    },
  });

  const onSubmit = (data) => {
    createMutation.mutate(data);
  };

  return (
    <div className="">
      {createMutation.isPending && <Loading />}

      <p className="text-2xl font-poppins font-semibold">Crear Usuario</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex flex-col gap-10 items-center w-full justify-center">
            <div className="w-full flex gap-8">
              <Controller
                name="username"
                control={control}
                rules={{
                  required: "El usuario es requerido",
                }}
                render={({ field }) => {
                  return (
                    <Label className="w-1/3">
                      Usuario:
                      <Input
                        className=""
                        type="text"
                        placeholder="Ingrese el usuario"
                        {...field}
                      />
                      {errors.username && (
                        <div className="text-red-500 text-xs">
                          {errors.username.message}
                        </div>
                      )}
                    </Label>
                  );
                }}
              />

              <Controller
                name="rol"
                control={control}
                rules={{
                  required: "El rol es requerido",
                }}
                render={({ field }) => {
                  return (
                    <div className="w-1/3">
                      Rol:
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Roles</SelectLabel>

                            <SelectItem value={`trabajador`}>
                              Trabajador
                            </SelectItem>
                            <SelectItem value={`administrador`}>
                              Administrador
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {errors.rol && (
                        <div className="text-red-500 text-xs">
                          {errors.rol.message}
                        </div>
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "La contraseña es requerida",
                }}
                render={({ field }) => {
                  return (
                    <Label className="w-1/3">
                      Password:
                      <Input
                        className=""
                        type="password"
                        placeholder="Ingrese la contraseña del usuario"
                        {...field}
                      />
                      {errors.password && (
                        <div className="text-red-500 text-xs">
                          {errors.password.message}
                        </div>
                      )}
                    </Label>
                  );
                }}
              />
            </div>

            <div className=" flex justify-end gap-8 w-full">
              <Button type="submit">Guardar</Button>
              <Button
                variant={"destructive"}
                onClick={() => navigate("/admin/user")}
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
