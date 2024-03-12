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
import { Loading } from "../../components/Loading";

export const CreateOfertas = () => {
  const navigate = useNavigate();

  const { data: productos } = UseProductAll();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id_producto: "",
      descripcion: "",
      priorizacion: "",
      descuento: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/ofertas", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Oferta creada correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/offer");
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    createMutation.mutate(data);
  };
  return (
    <div className="">
      {createMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Crear Oferta</p>
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
                    <div className="w-1/3 grid gap-15 font-semibold">
                      Producto:
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {productos?.map((item, index) => {
                              return (
                                <SelectItem
                                  key={item.id_producto}
                                  value={`${item.id_producto}`}
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
                name="priorizacion"
                control={control}
                rules={{
                  required: "La priorizacion es requerido",
                }}
                render={({ field }) => {
                  return (
                    <div className="w-1/3 grid gap-15 font-semibold">
                      Priorizacion:
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={`SI`}>SI</SelectItem>
                            <SelectItem value={`NO`}>NO</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {errors.priorizacion && (
                        <div className="text-red-500 text-xs">
                          {errors.priorizacion.message}
                        </div>
                      )}
                    </div>
                  );
                }}
              />
              <Controller
                name="descuento"
                control={control}
                rules={{
                  required: "El descuento es requerido",
                }}
                render={({ field }) => {
                  return (
                    <Label className="w-1/3">
                      Precio Descuento:
                      <Input
                        className=""
                        type="text"
                        placeholder="Ingrese el descuento de la oferta"
                        {...field}
                      />
                      {errors.descuento && (
                        <div className="text-red-500 text-xs">
                          {errors.descuento.message}
                        </div>
                      )}
                    </Label>
                  );
                }}
              />
            </div>
            <div className="w-full flex gap-8">
              <Controller
                name="descripcion"
                control={control}
                rules={{
                  required: "La descripcion es requerida",
                }}
                render={({ field }) => {
                  return (
                    <Label className="w-full">
                      Descripcion:
                      <Input
                        className=""
                        type="text"
                        placeholder="Ingrese la descripcion de la oferta"
                        {...field}
                      />
                      {errors.descripcion && (
                        <div className="text-red-500 text-xs">
                          {errors.descripcion.message}
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
