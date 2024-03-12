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
import { useModeloAutoAll } from "../../hooks/ModeloAuto/useModeloAutoAll";
import { useMarcaAutoAll } from "../../hooks/MarcaAuto/useMarcaAutoAll";
import { useState } from "react";
import { Loading } from "../../components/Loading";

export const CreateAplicacion = () => {
  const { data } = UseProductAll();
  const { data: modelos } = useModeloAutoAll();
  const { data: marcas } = useMarcaAutoAll();
  const [filterModels, setFilterModels] = useState([]);

  const onMarcaChange = (e) => {
    const marca = e;
    const modelosinput = modelos.filter((m) => m.id_marca_auto == marca);
    console.log(modelosinput);
    setFilterModels(modelosinput);
  };

  console.log(modelos);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id_producto: "",
      id_modelo_auto: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("aplicaciones", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Aplicacion creado correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/application");
    },
  });

  const onSubmit = (data) => {
    // console.log(data);
    createMutation.mutate(data);
  };

  return (
    <div>
      {createMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Crear Aplicacion</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14 border-2 border-admin-gray/10">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex flex-col gap-10 items-center w-full justify-center">
            <div className="w-full flex gap-8">
              <div className="w-full flex gap-8">
                <Controller
                  name="id_producto"
                  control={control}
                  rules={{
                    required: "El usuario es requerido",
                  }}
                  render={({ field }) => {
                    return (
                      <div className="grid font-semibold text-sm w-1/2">
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
                                    value={` ${product.id_producto}`}
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

                <div className="grid font-semibold text-sm w-1/2">
                  Marca Automovil:
                  <Select onValueChange={onMarcaChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Marcas</SelectLabel>

                        {marcas?.map((product) => {
                          return (
                            <SelectItem
                              key={product.id_marca_auto}
                              value={` ${product.id_marca_auto}`}
                            >
                              {product.nombre}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <Controller
                  name="id_modelo_auto"
                  control={control}
                  rules={{
                    required: "El campo es requerido",
                  }}
                  render={({ field }) => {
                    return (
                      <div className="grid font-semibold text-sm w-1/2">
                        Modelo Automovil:
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Modelos</SelectLabel>
                              {filterModels?.map((product) => {
                                return (
                                  <SelectItem
                                    key={product.id_modelo_auto}
                                    value={` ${product.id_modelo_auto}`}
                                  >
                                    {product.nombre}
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
              </div>
            </div>
            <div className=" flex justify-end gap-8 w-full">
              <Button variant={"default"} type="submit">
                Guardar
              </Button>
              <Button
                variant={"destructive"}
                onClick={() => navigate("/admin/application")}
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
