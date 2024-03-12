import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/axiosConfig";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useModeloAutoId } from "../../hooks/ModeloAuto/useModeloAutoId";
import { Label } from "@/components/ui/label";
import { Loading } from "../../components/Loading";

interface formData {
  nombre: string;
  anio_inicio: string;
  anio_termino: string;
  img_url: string;
  id_marca_auto: number;
}

export const EditModeloAutomovil = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useModeloAutoId(id);
  console.log(data);

  const [previewImage, setPreviewImage] = useState(null);
  const [form, setForm] = useState({
    id_marca_auto: "",
    nombre: "",
    anio_inicio_termino: "",
    motor: "",
    file: null,
  });

  const [modelo, setModelo] = useState({
    nombre: "",
    anio_inicio_termino: "",
    img_url: "",
    id_marca_auto: "",
  });

  const editMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.put(`/modelo_autos/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Modelo actualizado", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/car-model");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(modelo);
    const data = new FormData();
    data.append("nombre", modelo.nombre);
    data.append("anio_inicio_termino", modelo.anio_inicio_termino);
    data.append("id_marca_auto", modelo.id_marca_auto);
    if (form.file !== null) {
      data.append("file", form.file);
    }
    editMutation.mutate(data);
  };

  useEffect(() => {
    if (data) {
      setModelo(data);
    }
  }, [data]);

  return (
    <div className="">
      {editMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">
        Editar Modelo Automovil
      </p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        {data && (
          <form onSubmit={handleSubmit} className="">
            <div className="flex flex-col gap-10">
              <div className="flex items-center gap-10">
                <div className="w-1/2 flex flex-col gap-8">
                  <Label>
                    Marca Automovil:
                    <Input
                      className=""
                      type="text"
                      disabled
                      placeholder="Ingrese la marca del automovil"
                      defaultValue={modelo?.nombre_marca}
                    />
                  </Label>
                  <Label>
                    Modelo:
                    <Input
                      className=""
                      type="text"
                      placeholder="Ingrese el nombre de la categoria"
                      defaultValue={data?.nombre_modelo}
                      onChange={(e) => {
                        setModelo({
                          ...modelo,
                          nombre: e.target.value,
                        });
                      }}
                    />
                  </Label>

                  <Label>
                    Año Inicio - Año Termino:
                    <Input
                      className=""
                      type="text"
                      placeholder="Ingrese el nombre de la categoria"
                      defaultValue={modelo?.anio_inicio_termino}
                      onChange={(e) => {
                        setModelo({
                          ...modelo,
                          anio_inicio_termino: e.target.value,
                        });
                      }}
                    />
                  </Label>
                  <Label>
                    Motor
                    <Input
                      className=""
                      type="text"
                      placeholder="Ingrese el Motor del modelo"
                      defaultValue={modelo?.motor}
                      onChange={(e) => {
                        setModelo({
                          ...modelo,
                          anio_termino: e.target.value,
                        });
                      }}
                    />
                  </Label>
                  <Label>
                    Imagen url:
                    <Input
                      className=""
                      type="file"
                      placeholder="Ingrese la imagen del modelo"
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
                  ) : modelo?.img_url ? (
                    <div className="flex justify-center items-center w-full h-64">
                      <img
                        src={modelo.img_url}
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
        )}
      </div>
    </div>
  );
};
