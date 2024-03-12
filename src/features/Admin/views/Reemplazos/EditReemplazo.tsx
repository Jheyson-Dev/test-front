import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/axiosConfig";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useReemplazoId } from "../../hooks/Reemplazo/useReemplazoId";

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
import { Item } from "@radix-ui/react-select";
import { Label } from "@/components/ui/label";
import { Loading } from "../../components/Loading";

interface Reemplazo {
  id_producto: number | string;
  producto_reemplazo: number | string;
  variacion: number | string;
}
export const EditReemplazo = () => {
  const { id } = useParams();
  const { data } = useReemplazoId(id);
  console.log(data);

  const navigate = useNavigate();

  const { data: productos } = UseProductAll();

  const [form, setForm] = useState({
    id_producto: "",
    producto_reemplazo: "",
    variacion: "",
  });

  const editMutation = useMutation({
    mutationFn: async (data: Reemplazo) => {
      const response = await api.put(`/reemplazos/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Reemplazo actualizado", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/replace");
    },
  });

  // Manejar el subir del formulario
  const submit = (e) => {
    e.preventDefault();
    const copy = { ...form };
    delete copy.codigo_interno_original;
    delete copy.codigo_interno_reemplazo;

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
      <p className="text-2xl font-poppins font-semibold">Editar Reemplazo</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        {data && (
          <form onSubmit={submit} className="">
            <div className="flex flex-col gap-10">
              <div className="flex items-center gap-10">
                <div className="w-full flex gap-8">
                  <div className="grid font-semibold text-sm w-1/3">
                    Codigo Producto actual: {data.codigo_interno_original}
                    <Select
                      onValueChange={(e) =>
                        setForm({
                          ...form,
                          id_producto: Number(e),
                        })
                      }
                      defaultValue={data?.id_producto.toString()}
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
                                value={`${product.id_producto}`}
                              >
                                {product.codigo_interno}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid font-semibold text-sm w-1/3">
                    Codigo Reemplazo actual: {data.codigo_interno_reemplazo}
                    <Select
                      defaultValue={data?.id_reemplazo.toString()}
                      onValueChange={(e) =>
                        setForm({
                          ...form,
                          producto_reemplazo: Number(e),
                        })
                      }
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
                                value={`${product.id_producto}`}
                              >
                                {product.codigo_interno}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <Label className="w-1/3">
                    Variacion:
                    <Input
                      className=""
                      type="text"
                      placeholder="Ingrese el correo del usuario"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          variacion: Number(e.target.value),
                        })
                      }
                      defaultValue={data?.variacion}
                    />
                  </Label>
                </div>
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
        )}
      </div>
    </div>
  );
};
