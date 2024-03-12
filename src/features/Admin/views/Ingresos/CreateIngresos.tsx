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
import { UseProductAll } from "../../hooks/Product/UseProductAll";
import { useTiendaAll } from "../../hooks/Tienda/useTiendaAll";
import { Loading } from "../../components/Loading";

export const CreateIngresos = () => {
  const navigate = useNavigate();
  const { data: productos } = UseProductAll();

  const { data: tiendas } = useTiendaAll();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cantidad: "",
      fecha_hora: "2023-12-12 18:30",
      id_producto: "",
      id_tienda_producto: "",
    },
  });
  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/ingresos", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Ingreso creado correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/ingresos");
    },
  });

  const onSubmit = (data) => {
    const fecha = new Date();
    const formatDate =
      fecha.getFullYear() +
      "-" +
      (fecha.getMonth() + 1) +
      "-" +
      fecha.getDate() +
      " " +
      fecha.getHours() +
      ":" +
      fecha.getMinutes();
    data.fecha_hora = formatDate;
    const copy = { ...data };

    copy.id_tienda = copy.id_tienda_producto;

    delete copy.id_tienda_producto;
    console.log(copy);
    createMutation.mutate(copy);
  };

  return (
    <div className="">
      {createMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Crear Ingreso</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex flex-col gap-10 items-center w-full justify-center">
            <div className="w-full flex gap-8">
              <Controller
                name="id_producto"
                control={control}
                rules={{
                  required: "El producto es requerido",
                }}
                render={({ field }) => {
                  return (
                    <div className="w-1/3 text-sm font-semibold">
                      Codigo Interno:
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {productos?.map((item) => {
                              return (
                                <SelectItem
                                  value={`${item.id_producto}`}
                                  key={item.id_producto}
                                >
                                  {item.codigo_interno}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {errors.id_producto && (
                        <div className="text-red-500 text-xs">
                          {errors.id_producto.message}
                        </div>
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="cantidad"
                control={control}
                rules={{
                  required: "La contraseña es requerida",
                }}
                render={({ field }) => {
                  return (
                    <Label className="w-1/3">
                      Cantidad:
                      <Input
                        className=""
                        type="number"
                        placeholder="Ingrese la cantidad"
                        {...field}
                      />
                      {errors.cantidad && (
                        <div className="text-red-500 text-xs">
                          {errors.cantidad.message}
                        </div>
                      )}
                    </Label>
                  );
                }}
              />
              <Controller
                name="id_tienda_producto"
                control={control}
                rules={{
                  required: "La contraseña es requerida",
                }}
                render={({ field }) => {
                  return (
                    <div className="w-1/3 grid font-semibold text-sm">
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
                            {tiendas?.map((item, index) => {
                              return (
                                <SelectItem
                                  value={`${item.id_tienda}`}
                                  key={index}
                                >
                                  {item.direccion}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {errors.id_tienda_producto && (
                        <div className="text-red-500 text-xs">
                          {errors.id_tienda_producto.message}
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
                onClick={() => navigate("/admin/ingresos")}
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
