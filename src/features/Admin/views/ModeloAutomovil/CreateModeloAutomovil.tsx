import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/utils/axiosConfig";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";

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
import { useMarcaAutoAll } from "../../hooks/MarcaAuto/useMarcaAutoAll";
import { useState } from "react";
import { Loading } from "../../components/Loading";

export const CreateModeloAutomovil = () => {
  const navigate = useNavigate();
  const { data } = useMarcaAutoAll();
  const [previewImage, setPreviewImage] = useState(null);

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/modelo_autos", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },

    onSuccess: (data) => {
      toast.success("Modelo de auto creado correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/car-model");
    },
  });

  const [form, setForm] = useState({
    id_marca_auto: "",
    nombre: "",
    anio_inicio_termino: "",
    motor: "",
    file: null,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("id_marca_auto", form.id_marca_auto);
    data.append("nombre", form.nombre);
    data.append("motor", form.motor);
    data.append("anio_inicio_termino", form.anio_inicio_termino);
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
                <div className="grid font-semibold text-sm">
                  Marca Automovil
                  <Select
                    onValueChange={(value) => {
                      setForm({ ...form, id_marca_auto: value });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Marcas</SelectLabel>
                        {data?.map((categoria) => {
                          return (
                            <SelectItem
                              key={categoria.id_marca_auto}
                              value={` ${categoria.id_marca_auto}`}
                            >
                              {categoria.nombre}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Label className="">
                  Modelo:
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
                  Motor:
                  <Input
                    className=""
                    type="text"
                    placeholder="Ingrese el motor del auto"
                    onChange={(e) => {
                      setForm({ ...form, motor: e.target.value });
                    }}
                  />
                </Label>
                <Label className="">
                  Año Inicio Año Termino:
                  <Input
                    className=""
                    type="text"
                    placeholder="Ingrese el año de inicio"
                    onChange={(e) => {
                      setForm({ ...form, anio_inicio_termino: e.target.value });
                    }}
                  />
                </Label>

                <Label className="">
                  Imagen:
                  <Input
                    className=""
                    type="file"
                    placeholder="Ingrese la url imagen de campo medicion"
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
                onClick={() => navigate("/admin/car-model")}
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
