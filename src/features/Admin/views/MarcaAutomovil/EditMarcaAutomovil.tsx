import { useNavigate, useParams } from "react-router-dom";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/axiosConfig";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useMarcaAutoId } from "../../hooks/MarcaAuto/useMarcaAutoId";
import { Loading } from "../../components/Loading";

interface formData {
  nombre: string;
  img_url: string;
}
export const EditMarcaAutomovil = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useMarcaAutoId(id);
  console.log(data);

  const [previewImage, setPreviewImage] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    file: null,
  });
  const editMutation = useMutation({
    mutationFn: async (data: formData) => {
      const response = await api.put(`/marca_autos/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Modelo actualizado", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/car-brand");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append("nombre", form.nombre);
    data.append("file", form.file);
    editMutation.mutate(data);
    // console.log(marca);
    // editMutation.mutate(marca);
  };

  useEffect(() => {
    if (data) {
      const copy = { ...data };
      delete copy.modelos_auto;
      setForm(copy);
    }
  }, [data]);

  return (
    <div className="">
      {editMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Editar Marca</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        {data && (
          <form onSubmit={handleSubmit} className="">
            <div className="flex flex-col gap-10">
              <div className="flex gap-10 min-w-[900px] max-w-[1200px]">
                <div className="w-1/2 flex flex-col gap-8">
                  <Label className="grid gap-1.5 font-semibold text-xl w-[450px]">
                    Marca:
                    <Input
                      className=""
                      type="text"
                      placeholder="Ingrese el nombre de la categoria"
                      disabled
                      defaultValue={data.nombre_marca}
                      onChange={(e) => {
                        setForm({ ...form, nombre: e.target.value });
                      }}
                    />
                  </Label>
                  <Label className="grid gap-1.5 font-semibold text-xl w-[450px]">
                    Imagen url:
                    <Input
                      className=""
                      type="file"
                      placeholder="Ingrese el nombre de la categoria"
                      onChange={(e) => {
                        setForm({ ...form, file: e.target.files[0] });
                        setPreviewImage(URL.createObjectURL(e.target.files[0]));
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
                  ) : data?.img_url_marca ? (
                    <div className="flex justify-center items-center w-full h-64">
                      <img
                        src={data.img_url_marca}
                        className="aspect-video object-contain border-2 border-admin-gray/10 rounded-xl h-full"
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
        )}
      </div>
    </div>
  );
};
