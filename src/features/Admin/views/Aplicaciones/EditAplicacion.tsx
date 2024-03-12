import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/axiosConfig";
import { toast } from "sonner";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";

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
import { useAplicationId } from "../../hooks/Aplicacion/useAplicationId";
import { UseProductAll } from "../../hooks/Product/UseProductAll";
import { useModeloAutoAll } from "../../hooks/ModeloAuto/useModeloAutoAll";
import { Loading } from "../../components/Loading";

interface Aplicacion {
  id_producto: number;
  id_modelo_auto: number;
}
export const EditAplicacion = () => {
  const { id } = useParams();
  const { data } = useAplicationId(id);
  console.log(data);
  const navigate = useNavigate();

  const { data: productos } = UseProductAll();
  const { data: modelos } = useModeloAutoAll();

  const [form, setForm] = useState({
    id_producto: "",
    id_modelo_auto: "",
  });

  const editMutation = useMutation({
    mutationFn: async (data: Aplicacion) => {
      const response = await api.put(`/aplicaciones/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Aplicacion actualizada", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/application");
    },
  });

  // Manejar el subir formulario
  const submit = (e) => {
    e.preventDefault();
    const copy = { ...form };
    delete copy.codigo_interno;

    delete copy.nombre_modelo_auto;
    console.log(copy);
    editMutation.mutate(copy);
  };

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  return (
    <div>
      {editMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Editar Aplicacion</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        {data && (
          <form onSubmit={submit} className="">
            <div className="flex flex-col gap-10">
              <div className="flex items-center gap-10">
                <div className="w-full flex gap-8">
                  <div className="grid font-semibold text-sm w-1/2">
                    Codigo Producto:
                    <Select
                      onValueChange={
                        (e) =>
                          setForm({
                            ...form,
                            id_producto: Number(e),
                          })
                        // console.log(e)
                      }
                      // defaultValue={}
                      // onValueChange={field.onChange}
                      // defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Producto</SelectLabel>
                          {productos?.map((product) => {
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
                  </div>

                  <div className="grid font-semibold text-sm w-1/2">
                    Modelo Auto:
                    <Select
                      defaultValue=""
                      // defaultValue={}
                      // onValueChange={field.onChange}
                      // defaultValue={field.value}
                      onValueChange={(e) =>
                        setForm({
                          ...form,
                          id_modelo_auto: Number(e),
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Producto</SelectLabel>
                          {modelos?.map((product) => {
                            return (
                              <SelectItem
                                key={product.id_modelo_auto}
                                value={`${product.id_modelo_auto}`}
                              >
                                {product.nombre}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
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
        )}
      </div>
    </div>
  );
};
