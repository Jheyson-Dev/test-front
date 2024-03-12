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
import { useTiendaAll } from "../../hooks/Tienda/useTiendaAll";
import { UseProductAll } from "../../hooks/Product/UseProductAll";
import { Loading } from "../../components/Loading";

export const CreateTiendaProducto = () => {
  const { data: tiendas } = useTiendaAll();
  const { data: productos } = UseProductAll();

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id_producto: "",
      id_tienda: "",
      stock: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/tienda_productos", data);

      return response.data;
    },
    onSuccess: () => {
      toast.success("Asignacion de producto creado correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/store-product");
    },
  });

  const onSubmit = (data) => {
    createMutation.mutate(data);
  };
  return (
    <div>
      {createMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">
        Asignar Producto y stock
      </p>
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
                        Codigo Producto:
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
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
                  name="id_tienda"
                  control={control}
                  rules={{
                    required: "El codigo del reemplazo es requerido",
                  }}
                  render={({ field }) => {
                    return (
                      <div className="grid font-semibold text-sm w-1/3">
                        Tienda
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {tiendas?.map((product, index) => {
                                return (
                                  <SelectItem
                                    key={product.id_tienda}
                                    value={`${product.id_tienda}`}
                                  >
                                    {product.direccion}
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
                <Controller
                  name="stock"
                  control={control}
                  rules={{
                    required: "El stock es requerido",
                  }}
                  render={({ field }) => {
                    return (
                      <Label className="w-1/3">
                        Stock:
                        <Input
                          className=""
                          type="text"
                          placeholder="Ingrese el stock"
                          {...field}
                        />
                        {errors.stock && (
                          <div className="text-red-500 text-xs">
                            {errors.stock.message}
                          </div>
                        )}
                      </Label>
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
                onClick={() => navigate("/admin/store-product")}
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
