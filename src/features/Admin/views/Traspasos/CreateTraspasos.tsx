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

import React from "react";
import { useTiendaAll } from "../../hooks/Tienda/useTiendaAll";
import { Loading } from "../../components/Loading";

export const CreateTraspasos = () => {
  const { data: productos } = UseProductAll();
  const { data: tiendas } = useTiendaAll();
  console.log(tiendas);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id_producto: "",
      cantidad: "",
      usuario: localStorage.getItem("usuario") || "",
      fecha_hora: "",
      id_tienda_origen: "",
      id_tienda_destino: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/traspasos", data);

      return response.data;
    },
    onSuccess: () => {
      toast.success("Traspaso creado correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/transfer");
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
    copy.fecha_hora = formatDate;

    console.log(copy);
    createMutation.mutate(data);
  };

  return (
    <div>
      {createMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Crear Traspaso</p>
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
                      <div className="grid font-semibold text-sm w-1/4">
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
                              {productos?.map((product, index) => {
                                return (
                                  <SelectItem
                                    key={index}
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
                  name="id_tienda_origen"
                  control={control}
                  rules={{
                    required: "El codigo del reemplazo es requerido",
                  }}
                  render={({ field }) => {
                    return (
                      <div className="grid font-semibold text-sm w-1/4">
                        Tienda Origen:
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
                              {tiendas?.map((product, index) => {
                                return (
                                  <SelectItem
                                    key={index}
                                    value={`${product.id_tienda}`}
                                  >
                                    {product.direccion}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {errors.id_tienda_origen && (
                          <div className="text-red-500 text-xs">
                            {errors.id_tienda_origen.message}
                          </div>
                        )}
                      </div>
                    );
                  }}
                />

                <Controller
                  name="id_tienda_destino"
                  control={control}
                  rules={{
                    required: "El codigo del reemplazo es requerido",
                  }}
                  render={({ field }) => {
                    return (
                      <div className="grid font-semibold text-sm w-1/4">
                        Tienda Destino:
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
                              {tiendas?.map((product, index) => {
                                return (
                                  <SelectItem
                                    key={index}
                                    value={`${product.id_tienda}`}
                                  >
                                    {product.direccion}
                                  </SelectItem>
                                );
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {errors.id_tienda_destino && (
                          <div className="text-red-500 text-xs">
                            {errors.id_tienda_destino.message}
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
                    required: "La cantidad es requerida",
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
              </div>
            </div>
            <div className="w-full"></div>
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
