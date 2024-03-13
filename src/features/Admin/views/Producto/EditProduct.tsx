import { Button } from "@/components/ui/button";

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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProductId } from "../../hooks/Product/useProductId";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/utils/axiosConfig";
import { Loading } from "../../components/Loading";

interface formData {
  codigo_interno: string;
  codigo_fabricante: string;
  codigo_OEM: string;
  origen: string;
  marca_fabricante: string;
  descripcion: string;
  multiplos: string;
  medida: string;
  stock: number | string;
  precio: number | string;
  oferta: string;
}

export const EditProduct = () => {
  const { id } = useParams();
  const { data } = useProductId(id);
  console.log(data);

  const navigate = useNavigate();

  const [form, setform] = useState({
    nombre_producto: "",
    codigo_interno: "",
    codigo_fabricante: "",
    codigo_OEM: "",
    origen: "",
    marca_fabricante: "",
    descripcion: "",
    multiplos: "",
    medida: "",
    precio_compra: "",
    precio_venta: "",
    precio_minimo: "",
  });

  const editmUtation = useMutation({
    mutationFn: async (data: formData) => {
      const response = await api.put(`/productos/${id}`, data);
      console.log(response);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Producto actualizado", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/product");
    },
  });

  const submit = (e) => {
    e.preventDefault();
    const copy = { ...form };
    delete copy.nombre_producto;
    delete copy.imagenes;
    delete copy.aplicaciones;
    delete copy.ofertas;
    delete copy.reemplazos;
    delete copy.tiendas;
    delete copy.tipo;
    delete copy.url_campo_medicion;
    delete copy.id_producto;
    delete copy.campo_medicion;
    console.log(copy);
    editmUtation.mutate(copy);
  };

  useEffect(() => {
    if (data) {
      setform(data);
    }
  }, [data]);

  return (
    <div className="">
      {editmUtation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Editar Producto</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        {data && (
          <form onSubmit={submit} className="">
            <div className="flex flex-col gap-10">
              <div className="w-full flex gap-8">
                <Label className="w-1/3">
                  Categoria producto
                  <Input
                    className=""
                    type="text"
                    disabled
                    placeholder={data?.nombre_producto}
                  />
                </Label>
                <Label className="w-1/3">
                  Código Interno
                  <Input
                    type="text"
                    placeholder="Ingrese el código interno"
                    defaultValue={form?.codigo_interno}
                    disabled
                    // onChange={(e) =>
                    //   setform({
                    //     ...form,
                    //     codigo_interno: e.target.value,
                    //   })
                    // }
                  />
                </Label>
                <Label className="w-1/3">
                  Código Fabricante
                  <Input
                    type="text"
                    defaultValue={form?.codigo_fabricante}
                    onChange={(e) =>
                      setform({
                        ...form,
                        codigo_fabricante: e.target.value,
                      })
                    }
                    placeholder="Ingrese el código del fabricante"
                  />
                </Label>
              </div>
              <div className="w-full flex gap-8">
                <Label className="w-1/3">
                  Código OEM:
                  <Input
                    type="text"
                    defaultValue={form?.codigo_OEM}
                    onChange={(e) =>
                      setform({ ...form, codigo_OEM: e.target.value })
                    }
                    placeholder="Ingrese en código OEM"
                  />
                </Label>

                <Label className="w-1/3">
                  Origen:
                  <Input
                    type="text"
                    defaultValue={form?.origen}
                    onChange={(e) =>
                      setform({ ...form, origen: e.target.value })
                    }
                    placeholder="Ingrese el origen del producto"
                  />
                </Label>

                <Label className="w-1/3">
                  Marca:
                  <Input
                    type="text"
                    defaultValue={form?.marca_fabricante}
                    onChange={(e) =>
                      setform({
                        ...form,
                        marca_fabricante: e.target.value,
                      })
                    }
                    placeholder="Ingrese la marca del producto"
                  />
                </Label>
              </div>
              <div className="w-full flex gap-8">
                <Label className="w-1/3">
                  Descripción:
                  <Input
                    type="text"
                    defaultValue={form?.descripcion}
                    onChange={(e) =>
                      setform({ ...form, descripcion: e.target.value })
                    }
                    placeholder="Ingrese la descripción del producto"
                  />
                </Label>

                <Label className="w-1/3">
                  Mútiplos:
                  <Input
                    type="text"
                    defaultValue={form?.multiplos}
                    onChange={(e) =>
                      setform({ ...form, multiplos: e.target.value })
                    }
                    placeholder="Ingrese los multiplos del producto"
                  />
                </Label>

                <Label className="w-1/3">
                  Medida:
                  <Input
                    type="text"
                    defaultValue={form?.medida}
                    onChange={(e) =>
                      setform({ ...form, medida: e.target.value })
                    }
                    placeholder="Ingrese la medida del producto"
                  />
                </Label>
              </div>
              <div className="w-full flex gap-8">
                <Label className="w-1/3">
                  Precio Compra:
                  <Input
                    type="number"
                    step="0.01"
                    defaultValue={form?.precio_compra}
                    onChange={(e) =>
                      setform({ ...form, precio_compra: e.target.value })
                    }
                    placeholder="Ingrese el precio de compra del producto"
                  />
                </Label>
                <Label className="w-1/3">
                  Precio Venta:
                  <Input
                    type="number"
                    step="0.01"
                    defaultValue={form?.precio_venta}
                    onChange={(e) =>
                      setform({ ...form, precio_venta: e.target.value })
                    }
                    placeholder="Ingrese el precio de venta del producto"
                  />
                </Label>
                <Label className="w-1/3">
                  Precio Minimo:
                  <Input
                    type="number"
                    step="0.01"
                    defaultValue={form?.precio_minimo}
                    onChange={(e) =>
                      setform({ ...form, precio_minimo: e.target.value })
                    }
                    placeholder="Ingrese el precio minimo del producto"
                  />
                </Label>
              </div>
              <p className="text-xl font-poppins font-semibold">
                Ubicaciones y Stock
              </p>
              <div className="w-full grid grid-cols-3 gap-8">
                {data?.tiendas.map((tienda, index) => {
                  return (
                    <Label>
                      {tienda?.razon_social}:
                      <Input disabled defaultValue={tienda?.stock} />
                    </Label>
                  );
                })}
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
        )}
      </div>
    </div>
  );
};
