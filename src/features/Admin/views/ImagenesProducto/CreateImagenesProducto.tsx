import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/utils/axiosConfig";
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
import { Label } from "@/components/ui/label";
import { UseProductAll } from "../../hooks/Product/UseProductAll";
import { useState } from "react";
import { Loading } from "../../components/Loading";

export const CreateImagenesProducto = () => {
  const navigate = useNavigate();
  const { data } = UseProductAll();

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/img_productos", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Imagen de Producto creada correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/image-product");
      return response.data;
    },
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [form, setForm] = useState({
    id_producto: "",
    file: null,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("id_producto", form.id_producto);
    data.append("file", form.file);
    createMutation.mutate(data);
  };
  return (
    <div className="">
      {createMutation.isPending && <Loading />}

      <p className="text-2xl font-poppins font-semibold">
        Crear Imagen Producto
      </p>
      <div className="shadow-2xl rounded-xl p-10 mt-14 border-2 border-admin-gray/10">
        <form onSubmit={onSubmit} className="">
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-10">
              <div className="w-1/2 flex flex-col gap-8">
                <div className="grid gap-1.5 font-semibold text-sm">
                  Codigo producto:
                  <Select
                    onValueChange={(e) => {
                      setForm({ ...form, id_producto: e });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione codigo del  producto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Codigos</SelectLabel>
                        {data?.map((categoria: any) => {
                          return (
                            <SelectItem
                              key={categoria.id_producto}
                              value={`${categoria.id_producto}`}
                            >
                              {categoria.codigo_interno}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Label>
                  Url imagen:
                  <Input
                    className=""
                    type="file"
                    placeholder="Ingrese la url de la imagen"
                    onChange={(e) => {
                      setForm({ ...form, file: e.target.files[0] });
                      const prevURL = URL.createObjectURL(e.target.files[0]);
                      setPreviewImage(prevURL);
                    }}
                  />
                </Label>
              </div>
              <div className="w-1/2 flex flex-col gap-8">
                {previewImage ? (
                  <div className="flex justify-center items-center w-full h-64 rounded-xl">
                    <img
                      src={previewImage}
                      className="aspect-video object-contain border-2 border-admin-gray/10 rounded-xl"
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
                onClick={() => navigate("/admin/image-product")}
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
