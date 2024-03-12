import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/utils/axiosConfig";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Loading } from "../../components/Loading";

export const CreateMarcaAutomovil = () => {
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState(null);

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/marca_autos", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },

    onSuccess: (data) => {
      toast.success("Marca de auto creada correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/car-brand");
    },
  });

  const [form, setForm] = useState({
    nombre: "",
    file: null,
  });

  const onSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nombre", form.nombre);
    data.append("file", form.file);

    createMutation.mutate(data);
  };
  return (
    <div className="">
      {createMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Crear Modelo Auto</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        <form onSubmit={onSubmit} className="">
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-10">
              <div className="w-1/2 flex flex-col gap-8">
                <Label className="">
                  Marca:
                  <Input
                    className=""
                    type="text"
                    placeholder="Ingrese el modelo del auto"
                    onChange={(e) => {
                      setForm({ ...form, nombre: e.target.value });
                    }}
                  />
                </Label>
                <Label className="">
                  Imagen
                  <Input
                    className=""
                    type="file"
                    placeholder="Ingrese imagen de la marca"
                    onChange={(e) => {
                      setForm({ ...form, file: e.target.files[0] });
                      setPreviewImage(URL.createObjectURL(e.target.files[0]));
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
                onClick={() => navigate("/admin/car-brand")}
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
