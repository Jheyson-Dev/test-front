import { useNavigate, useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/axiosConfig";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useComprasById } from "../../hooks/Compras/useComprasById";

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
import { Loading } from "../../components/Loading";

export const EditCompras = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useComprasById(id);

  const [previewImage, setPreviewImage] = useState(null);

  const [form, setForm] = useState({
    numero_factura: "",
    proveedor: "",
    fecha_inicio_vencimiento: "",
    estado: "",
    nombre_producto: "",
    file: null,
  });

  const [compra, setCompra] = useState({
    numero_factura: "",
    proveedor: "",
    fecha_inicio_vencimiento: "",
    estado: "",
    nombre_producto: "",
    img_url: "",
  });

  const editMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.put(`/compras/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Compra actualizada", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/purchase");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append("numero_factura", compra.numero_factura);
    data.append("proveedor", compra.proveedor);
    data.append("fecha_inicio_vencimiento", compra.fecha_inicio_vencimiento);
    data.append("estado", compra.estado);
    if (form.file !== null) {
      data.append("file", form.file);
    }

    console.log(data);
    editMutation.mutate(data);
  };

  useEffect(() => {
    if (data) {
      setCompra(data);
    }
  }, [data]);
  return (
    <div className="">
      {editMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Editar Categoria</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        {data && (
          <form onSubmit={handleSubmit} className="">
            <div className="flex flex-col gap-10">
              <div className="flex items-center gap-10">
                <div className="w-1/2 flex flex-col gap-8">
                  <Label>
                    N° Factura:
                    <Input
                      className=""
                      type="text"
                      placeholder="Ingrese el nombre de la categoría"
                      defaultValue={compra?.numero_factura}
                      onChange={(e) => {
                        setCompra({
                          ...compra,
                          numero_factura: e.target.value,
                        });
                      }}
                    />
                  </Label>

                  <Label>
                    Proveedor:
                    <Input
                      className=""
                      type="text"
                      placeholder="Ingrese el campo de medición"
                      defaultValue={compra?.proveedor}
                      onChange={(e) => {
                        setCompra({
                          ...compra,
                          proveedor: e.target.value,
                        });
                      }}
                    />
                  </Label>
                  <Label>
                    Fecha Incio Vencimiento:
                    <Input
                      className=""
                      type="text"
                      placeholder="Ingrese el campo de medición"
                      defaultValue={compra?.fecha_inicio_vencimiento}
                      onChange={(e) => {
                        setCompra({
                          ...compra,
                          fecha_inicio_vencimiento: e.target.value,
                        });
                      }}
                    />
                  </Label>
                  <Label className="">
                    Estado:
                    <Select
                      onValueChange={(value) => {
                        setCompra({
                          ...compra,
                          estado: value,
                        });
                      }}
                      defaultValue={`${compra?.estado}`}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value={`1`}>Pagado</SelectItem>
                          <SelectItem value={`0`}>Por Pagar</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Label>
                  <Label>
                    Imagen
                    <Input
                      className=""
                      type="file"
                      placeholder="Ingrese la Imagen"
                      onChange={(e) => {
                        setForm({
                          ...form,
                          file: e.target.files[0],
                        });
                        const prevURL = URL.createObjectURL(e.target.files[0]);
                        setPreviewImage(prevURL);
                      }}
                    />
                  </Label>
                </div>
                <div className="w-1/2 flex flex-col gap-8">
                  {previewImage ? (
                    <div className="flex justify-center items-center w-full h-64">
                      <img
                        src={previewImage}
                        className="aspect-video object-contain border-2 border-admin-gray/10 rounded-xl w-full"
                      />
                    </div>
                  ) : data?.img_url ? (
                    <div className="flex justify-center items-center w-full h-64">
                      <img
                        src={data.img_url}
                        className="aspect-video object-contain border-2 border-admin-gray/10 rounded-xl w-full"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center w-full h-64 rounded-xl bg-admin-gray/10">
                      <p className="text-2xl font-poppins font-semibold text-admin-gray/50">
                        Vista previa
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className=" flex justify-end gap-8 w-full">
                <Button variant={"default"} type="submit">
                  Guardar
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={() => navigate("/admin/purchase")}
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
