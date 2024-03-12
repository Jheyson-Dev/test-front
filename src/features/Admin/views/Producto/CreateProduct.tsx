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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCategoriaAll } from "../../hooks/Categoria/useCategoriaAll";

import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/axiosConfig";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loading } from "../../components/Loading";

export const CreateProduct = () => {
  const { data } = useCategoriaAll();
  const navigate = useNavigate();

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/productos", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Producto creado correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/product");
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id_categoria: "",
      codigo_interno: "",
      codigo_fabricante: "",
      codigo_oem: "",
      origen: "",
      marca_fabricante: "",
      descripcion: "",
      multiplos: "",
      medida: "",
      precio_compra: "",
      precio_venta: "",
      precio_minimo: "",
      pc: "",
    },
  });
  const onSubmit = (data) => {
    // console.log(data);
    const copy = { ...data };
    copy.pc = parseFloat(data.precio_compra);
    createMutation.mutate(copy);
  };

  return (
    <div className="">
      {createMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Crear Producto</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex flex-col gap-10">
            <div className="w-full flex gap-8">
              <Controller
                name="id_categoria"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => (
                  <div className="grid font-semibold text-sm w-1/3">
                    Nombre producto
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
                          {data?.map((categoria: any) => {
                            return (
                              <SelectItem
                                key={categoria.id_categoria}
                                value={`${categoria.id_categoria}`}
                              >
                                {categoria.nombre_producto}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.id_categoria && (
                      <div className="text-red-500 text-xs">
                        {errors.id_categoria.message}
                      </div>
                    )}
                  </div>
                )}
              />
              <Controller
                name="codigo_interno"
                control={control}
                // rules={{ required: "Este campo es requerido" }}
                render={({ field }) => (
                  <Label className="w-1/3">
                    Código Interno
                    <Input
                      type="text"
                      onChange={field.onChange}
                      value={field.value}
                      disabled
                      placeholder="Ingrese el código interno"
                    />
                    {/* {errors.codigo_interno && (
                      <div className="text-red-500 text-xs">
                        {errors.codigo_interno.message}
                      </div>
                    )} */}
                  </Label>
                )}
              />
              <Controller
                name="codigo_fabricante"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => {
                  return (
                    <Label className="w-1/3">
                      Código Fabricante
                      <Input
                        type="text"
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="Ingrese el código del fabricante"
                      />
                      {errors.codigo_fabricante && (
                        <div className="text-red-500 text-xs">
                          {errors.codigo_fabricante.message}
                        </div>
                      )}
                    </Label>
                  );
                }}
              />
            </div>
            <div className="w-full flex gap-8">
              <Controller
                name="codigo_oem"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => {
                  return (
                    <Label className="w-1/3">
                      Código OEM:
                      <Input
                        type="text"
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="Ingrese en código OEM"
                      />
                      {errors.codigo_oem && (
                        <div className="text-red-500 text-xs s">
                          {errors.codigo_oem.message}
                        </div>
                      )}
                    </Label>
                  );
                }}
              />

              <Controller
                name="origen"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => {
                  return (
                    <Label className="w-1/3">
                      Origen:
                      <Input
                        type="text"
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="Ingrese el origen del producto"
                      />
                      {errors.origen && (
                        <div className="text-red-500 text-xs">
                          {errors.origen.message}
                        </div>
                      )}
                    </Label>
                  );
                }}
              />

              <Controller
                name="marca_fabricante"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => {
                  return (
                    <Label className="w-1/3">
                      Marca:
                      <Input
                        type="text"
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="Ingrese la marca del producto"
                      />
                      {errors.marca_fabricante && (
                        <div className="text-red-500 text-xs">
                          {errors.marca_fabricante.message}
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
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => {
                  return (
                    <Label className="w-1/3">
                      Descripción:
                      <Input
                        type="text"
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="Ingrese la descripción del producto"
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
              <Controller
                name="multiplos"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => {
                  return (
                    <Label className="w-1/3">
                      Mútiplos:
                      <Input
                        type="text"
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="Ingrese los multiplos del producto"
                      />
                      {errors.multiplos && (
                        <div className="text-red-500 text-xs">
                          {errors.multiplos.message}
                        </div>
                      )}
                    </Label>
                  );
                }}
              />
              <Controller
                name="medida"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => {
                  return (
                    <Label className="w-1/3">
                      Medida:
                      <Input
                        type="text"
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="Ingrese la medida del producto"
                      />
                      {errors.medida && (
                        <div className="text-red-500 text-xs">
                          {errors.medida.message}
                        </div>
                      )}
                    </Label>
                  );
                }}
              />
            </div>
            <div className="w-full flex gap-8">
              <Controller
                name="precio_compra"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => {
                  return (
                    <Label className="w-1/3">
                      Precio Compra:
                      <Input
                        type="number"
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="Ingrese el Precio de compra del producto"
                      />
                      {errors.precio_compra && (
                        <div className="text-red-500 text-xs">
                          {errors.precio_compra.message}
                        </div>
                      )}
                    </Label>
                  );
                }}
              />
              <Controller
                name="precio_venta"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => {
                  return (
                    <Label className="w-1/3">
                      Precio Venta:
                      <Input
                        type="number"
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="Ingrese el precio de venta del producto"
                      />
                      {errors.precio_venta && (
                        <div className="text-red-500 text-xs">
                          {errors.precio_venta.message}
                        </div>
                      )}
                    </Label>
                  );
                }}
              />
              <Controller
                name="precio_minimo"
                control={control}
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => {
                  return (
                    <Label className="w-1/3">
                      Precio Minimo:
                      <Input
                        type="number"
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="Ingrese el precio minimo del producto"
                      />
                      {errors.precio_minimo && (
                        <div className="text-red-500 text-xs">
                          {errors.precio_minimo.message}
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
                onClick={() => navigate("/admin/product")}
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
