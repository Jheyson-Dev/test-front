import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/utils/axiosConfig";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Controller, set, useForm } from "react-hook-form";
import { useState } from "react";
import { s3Client } from "@/utils/s3Client";
import { v4 as uuid } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import axios from "axios";
import { Loading } from "../../components/Loading";

export const CreateCategoria = () => {
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState(null);

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/categorias", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },

    onSuccess: () => {
      toast.success("Categoria creada correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/category");
    },
  });

  const [form, setForm] = useState({
    nombre_producto: "",
    campo_medicion: "",
    file: null,
    tipo: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("nombre_producto", form.nombre_producto);
    data.append("campo_medicion", form.campo_medicion);
    data.append("file", form.file);
    data.append("tipo", form.tipo);

    createMutation.mutate(data);
  };

  return (
    <div className="">
      {createMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Crear Categoria</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        <form onSubmit={onSubmit} className="">
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-10">
              <div className="w-1/2 flex flex-col gap-8">
                {createMutation.isPending && <span>Loading</span>}
                <Label>
                  Nombre Categoria:
                  <Input
                    type="text"
                    placeholder="Nombre de la categoria"
                    onChange={(e) => {
                      setForm({ ...form, nombre_producto: e.target.value });
                    }}
                  />
                </Label>
                <Label>
                  Campo medicion:
                  <Input
                    type="text"
                    placeholder="Nombre de la categoria"
                    onChange={(e) => {
                      setForm({ ...form, campo_medicion: e.target.value });
                    }}
                  />
                </Label>
                <Label>
                  Tipo:
                  <Input
                    type="text"
                    placeholder="Nombre de la categoria"
                    onChange={(e) => {
                      setForm({ ...form, tipo: e.target.value });
                    }}
                  />
                </Label>
                <Label>
                  Imagen:
                  <Input
                    type="file"
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
                onClick={() => navigate("/admin/category")}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </form>
        {/* <form className="flex gap-8" onSubmit={subir}>
          <input
            type="file"
            onChange={(e) => {
              setImagen(e.target.files[0]);
            }}
          />
          <Button>Subir</Button>
        </form> */}
      </div>
    </div>
  );
};
