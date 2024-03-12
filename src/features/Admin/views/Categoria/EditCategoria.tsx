import { useNavigate, useParams } from "react-router-dom";
import { useCategoriaId } from "../../hooks/Categoria/useCategoriaId";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/axiosConfig";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";

export const EditCategoria = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useCategoriaId(id);

  const [previewImage, setPreviewImage] = useState(null);
  const [form, setForm] = useState({
    campo_medicion: "",
    nombre_producto: "",
    tipo: "",
    file: null,
  });

  const [categoria, setCategoria] = useState({
    nombre_categoria: "",
    campo_medicion: "",
    url_campo_medicion: "",
    tipo: "",
    nombre_producto: "",
  });

  const editMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.put(`/categorias/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Categoría actualizada", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/category");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append("nombre_producto", categoria.nombre_categoria);
    data.append("campo_medicion", categoria.campo_medicion);
    data.append("tipo", categoria.tipo);
    if (form.file !== null) {
      data.append("file", form.file);
    }
    editMutation.mutate(data);
  };

  useEffect(() => {
    if (data) {
      const copy = { ...data };
      delete copy.productos;
      setCategoria(copy);
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
                    Nombre:
                    <Input
                      className=""
                      type="text"
                      placeholder="Ingrese el nombre de la categoría"
                      defaultValue={categoria?.nombre_categoria}
                      onChange={(e) => {
                        setCategoria({
                          ...categoria,
                          nombre_categoria: e.target.value,
                        });
                      }}
                    />
                  </Label>
                  <Label>
                    Campo Medicion:
                    <Input
                      className=""
                      type="text"
                      placeholder="Ingrese el campo de medición"
                      defaultValue={categoria?.campo_medicion}
                      onChange={(e) => {
                        setCategoria({
                          ...categoria,
                          campo_medicion: e.target.value,
                        });
                      }}
                    />
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
                  <Label>
                    Tipo:
                    <Input
                      className=""
                      type="text"
                      placeholder="Ingrese el tipo de categoria"
                      defaultValue={categoria?.tipo}
                      onChange={(e) => {
                        setCategoria({
                          ...categoria,
                          tipo: e.target.value,
                        });
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
                  ) : data?.url_campo_medicion ? (
                    <div className="flex justify-center items-center w-full h-64">
                      <img
                        src={categoria.url_campo_medicion}
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
        )}
      </div>
    </div>
  );
};
