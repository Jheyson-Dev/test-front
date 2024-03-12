import { useNavigate, useParams } from "react-router-dom";
import { useImageId } from "../../hooks/ImagenesProducto/useImageId";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/utils/axiosConfig";
import { useMutation } from "@tanstack/react-query";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loading } from "../../components/Loading";

export const EditImagenesProduct = () => {
  const { id } = useParams();
  const { data } = useImageId(id);
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState(null);
  const [form, setForm] = useState({
    id_producto: "",
    file: null,
  });

  const [imagnes, setImagnes] = useState({
    id_producto: "",
  });

  const editMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.put(`/img_productos/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Imagen actualizada", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/image-product");
    },
  });

  useEffect(() => {
    if (data) {
      setImagnes(data);
    }
  }, [data]);

  // Manejar del submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("id_producto", imagnes.id_producto);
    if (form.file !== null) {
      data.append("file", form.file);
    }
    editMutation.mutate(data);
  };

  return (
    <div>
      {editMutation.isPending && <Loading />}

      <p className="text-2xl font-poppins font-semibold">Editar Imagenes</p>
      <div className="hadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        {data && (
          <form onSubmit={handleSubmit} className="">
            <div className="flex flex-col gap-10">
              <div className="flex gap-10 min-w-[900px] max-w-[1200px]">
                <div className="w-1/2 flex flex-col gap-8">
                  <Label className="grid gap-1.5 font-semibold text-xl w-[450px]">
                    ID producto
                    <Input
                      className=""
                      type="text"
                      placeholder="Ingrese el nombre de la categoria"
                      defaultValue={imagnes?.id_producto}
                      disabled
                      onChange={(e) => {
                        setForm({
                          ...form,
                          id_producto: e.target.value,
                        });
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
                        src={data?.img_url}
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
                  onClick={() => navigate("/admin/image-product")}
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
