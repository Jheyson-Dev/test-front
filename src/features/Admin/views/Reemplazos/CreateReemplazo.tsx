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

export const CreateReemplazo = () => {
  const { data } = UseProductAll();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id_producto: "",
      producto_reemplazo: "",
      variacion: "",
      notas: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/reemplazos", data);

      return response.data;
    },
    onSuccess: () => {
      toast.success("Reemplazo creado correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/replace");
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    createMutation.mutate(data);
  };

  return (
    <div>
      {createMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Crear Reemplazo</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex flex-col gap-10 items-center w-full justify-center">
            <div className="w-full flex gap-8">
              <div className="w-full flex gap-8">
                <Controller
                  name="id_producto"
                  control={control}
                  rules={{
                    required: "El codigo del producto es requerido",
                  }}
                  render={({ field }) => {
                    return (
                      <div className="grid font-semibold text-sm w-1/3">
                        Codigo Producto
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Producto</SelectLabel>
                              {data?.map((product) => {
                                return (
                                  <SelectItem
                                    key={product.id_producto}
                                    value={`${product.id_producto}`}
                                  >
                                    {product.codigo_interno}
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
                  name="producto_reemplazo"
                  control={control}
                  rules={{
                    required: "El codigo del reemplazo es requerido",
                  }}
                  render={({ field }) => {
                    return (
                      <div className="grid font-semibold text-sm w-1/3">
                        Codigo Reemplazo:
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Producto</SelectLabel>
                              {data?.map((product) => {
                                return (
                                  <SelectItem
                                    key={product.id_producto}
                                    value={`${product.id_producto}`}
                                  >
                                    {product.codigo_interno}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {errors.id_producto && (
                          <div className="text-red-500 text-xs">
                            {errors.producto_reemplazo.message}
                          </div>
                        )}
                      </div>
                    );
                  }}
                />
                <Controller
                  name="variacion"
                  control={control}
                  rules={{
                    required: "El % de variación es requerido",
                  }}
                  render={({ field }) => {
                    return (
                      <Label className="w-1/3">
                        Variacion:
                        <Input
                          className=""
                          type="text"
                          placeholder="Ingrese el % de variación"
                          {...field}
                        />
                        {errors.variacion && (
                          <div className="text-red-500 text-xs">
                            {errors.variacion.message}
                          </div>
                        )}
                      </Label>
                    );
                  }}
                />
              </div>
            </div>
            <div className="w-full">
              <Controller
                name="notas"
                control={control}
                rules={{
                  required: "El % de variación es requerido",
                }}
                render={({ field }) => {
                  return (
                    <Label className="w-full">
                      Notas:
                      <Input
                        className=""
                        type="text"
                        placeholder="Ingrese la nota de variación"
                        {...field}
                      />
                      {errors.notas && (
                        <div className="text-red-500 text-xs">
                          {errors.notas.message}
                        </div>
                      )}
                    </Label>
                  );
                }}
              />
            </div>
            <div className=" flex justify-end gap-8 w-full">
              <Button variant={"default"} type="submit">
                Guardar
              </Button>
              <Button
                variant={"destructive"}
                onClick={() => navigate("/admin/replace")}
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
