import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/utils/axiosConfig";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loading } from "../../components/Loading";

export const CreateTienda = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ruc: "",
      razon_social: "",
      direccion: "",
      encargado: "",
      celular: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/tiendas", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Tienda creada correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/store");
    },
  });

  const onSubmit = (data) => {
    // console.log(data);
    createMutation.mutate(data);
  };

  return (
    <div className="">
      {createMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Crear Tienda</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex flex-col gap-10 items-center w-full justify-center">
            <div className="w-full flex gap-8">
              <Controller
                name="ruc"
                control={control}
                rules={{
                  required: "El RUC es requerido",
                }}
                render={({ field }) => {
                  return (
                    <Label className="w-1/3">
                      RUC:
                      <Input
                        className=""
                        type="text"
                        placeholder="Ingrese el RUC"
                        {...field}
                      />
                      {errors.ruc && (
                        <div className="text-red-500 text-xs">
                          {errors.ruc.message}
                        </div>
                      )}
                    </Label>
                  );
                }}
              />

              <Controller
                name="razon_social"
                control={control}
                rules={{
                  required: "La razon social es requerida",
                }}
                render={({ field }) => {
                  return (
                    <Label className="w-1/3">
                      Razon Social:
                      <Input
                        className=""
                        type="text"
                        placeholder="Ingrese la razon social"
                        {...field}
                      />
                      {errors.razon_social && (
                        <div className="text-red-500 text-xs">
                          {errors.razon_social.message}
                        </div>
                      )}
                    </Label>
                  );
                }}
              />
              <Controller
                name="direccion"
                control={control}
                rules={{
                  required: "La dirección es requerida",
                }}
                render={({ field }) => {
                  return (
                    <Label className="w-1/3">
                      Direccion:
                      <Input
                        className=""
                        type="text"
                        placeholder="Ingrese la dirección"
                        {...field}
                      />
                      {errors.direccion && (
                        <div className="text-red-500 text-xs">
                          {errors.direccion.message}
                        </div>
                      )}
                    </Label>
                  );
                }}
              />
            </div>
            <div className="w-full flex gap-8">
              <Controller
                name="encargado"
                control={control}
                rules={{
                  required: "El encargado es requerido",
                }}
                render={({ field }) => {
                  return (
                    <Label className="w-1/3">
                      Encargado:
                      <Input
                        className=""
                        type="text"
                        placeholder="Ingrese el encargado"
                        {...field}
                      />
                      {errors.encargado && (
                        <div className="text-red-500 text-xs">
                          {errors.encargado.message}
                        </div>
                      )}
                    </Label>
                  );
                }}
              />
              <Controller
                name="celular"
                control={control}
                rules={{
                  required: "El celular es requerido",
                }}
                render={({ field }) => {
                  return (
                    <Label className="w-1/3">
                      Celular:
                      <Input
                        className=""
                        type="text"
                        placeholder="Ingrese el celular"
                        {...field}
                      />
                      {errors.celular && (
                        <div className="text-red-500 text-xs">
                          {errors.celular.message}
                        </div>
                      )}
                    </Label>
                  );
                }}
              />
              <div className="w-1/3"></div>
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
