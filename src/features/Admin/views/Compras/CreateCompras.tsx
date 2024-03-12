import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/utils/axiosConfig";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

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

export const CreateCompras = () => {
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState(null);

  const [form, setForm] = useState({
    numero_factura: "",
    proveedor: "",
    fecha_inicio_vencimiento: "",
    estado: "",
    file: null,
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/compras", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Compra creada correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/purchase");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("numero_factura", form.numero_factura);
    data.append("proveedor", form.proveedor);
    data.append("fecha_inicio_vencimiento", form.fecha_inicio_vencimiento);
    data.append("estado", form.estado);
    data.append("file", form.file);

    // console.log(data);

    createMutation.mutate(data);
  };
  return (
    <div className="">
      {createMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Crear Compra</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        <form onSubmit={onSubmit} className="">
          <div className="flex flex-col gap-10 items-center w-full justify-center">
            <div className="w-full flex gap-8">
              <Label className="w-1/3">
                Numero Factura:
                <Input
                  className=""
                  type="text"
                  placeholder="Ingrese el n° factura"
                  onChange={(e) => {
                    setForm({ ...form, numero_factura: e.target.value });
                  }}
                />
              </Label>
              <Label className="w-1/3">
                Proveedor:
                <Input
                  className=""
                  type="text"
                  placeholder="Ingrese el proveedor"
                  onChange={(e) => {
                    setForm({ ...form, proveedor: e.target.value });
                  }}
                />
              </Label>
              <Label className="w-1/3">
                Fecha Inicio - Vencimiento:
                <Input
                  className=""
                  type="text"
                  placeholder="Ingrese el proveedor"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      fecha_inicio_vencimiento: e.target.value,
                    });
                  }}
                />
              </Label>
            </div>

            <div className="w-full flex gap-8">
              <Label className="w-1/3">
                Imagen:
                <Input
                  className=""
                  type="file"
                  placeholder=""
                  onChange={(e) => {
                    setForm({ ...form, file: e.target.files[0] });
                    const prevURL = URL.createObjectURL(e.target.files[0]);
                    setPreviewImage(prevURL);
                  }}
                />
              </Label>
              <Label className="w-1/3">
                Estado:
                <Select
                  onValueChange={(value) => {
                    setForm({ ...form, estado: value });
                  }}
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
              <div className="w-1/3"></div>
            </div>

            <div className="w-1/2 flex flex-col gap-8">
              {previewImage ? (
                <div className="flex justify-center items-center w-full h-64 rounded-xl">
                  <img
                    src={previewImage}
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
