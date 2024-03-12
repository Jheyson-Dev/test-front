import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/axiosConfig";
import { toast } from "sonner";

import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { usePedidosById } from "../../hooks/Pedidos/usePedidosById";
import { Loading } from "../../components/Loading";

export const EditPedidos = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = usePedidosById(id);

  const [previewImage, setPreviewImage] = useState(null);

  const [form, setForm] = useState({
    cantidad: "",
    descripcion: "",
    medidas: "",
    file: null,
  });

  const [placa, setPlaca] = useState({
    cantidad: "",
    descripcion: "",
    medidas: "",
    img_url: "",
  });

  const editMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.put(`/pedidos/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Pedido actualizado", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/order");
    },
  });
  const submit = (e) => {
    e.preventDefault();
    console.log(placa);
    const data = new FormData();
    data.append("descripcion", placa.descripcion);
    data.append("medidas", placa.medidas);
    data.append("cantidad", placa.cantidad);
    if (form.file) {
      data.append("file", form.file);
    }

    editMutation.mutate(data);
  };
  useEffect(() => {
    if (data) {
      setPlaca(data);
    }
  }, [data]);
  return (
    <div className="">
      {editMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Editar Pedido</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        {data && (
          <form onSubmit={submit} className="">
            <div className="flex flex-col gap-10 w-full justify-center">
              <div className="flex justify-between items-center gap-10">
                <div className="w-1/2 flex flex-col gap-8 justify-center">
                  <Label>
                    Descripcion:
                    <Input
                      className=""
                      type="text"
                      placeholder="Ingrese la placa del usuario"
                      defaultValue={placa?.descripcion}
                      onChange={(e) =>
                        setPlaca({ ...placa, descripcion: e.target.value })
                      }
                    />
                  </Label>
                  <Label>
                    Cantidad:
                    <Input
                      className=""
                      type="text"
                      placeholder="Ingrese la Serie y/o vin"
                      defaultValue={placa?.cantidad}
                      onChange={(e) =>
                        setPlaca({ ...placa, cantidad: e.target.value })
                      }
                    />
                  </Label>
                  <Label>
                    Medidas:
                    <Input
                      className=""
                      type="text"
                      placeholder="Ingrese la Serie y/o vin"
                      defaultValue={placa?.medidas}
                      onChange={(e) =>
                        setPlaca({ ...placa, medidas: e.target.value })
                      }
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
                </div>
                <div className="w-1/2 flex justify-center h-64 items-center">
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
                  onClick={() => navigate("/admin/order")}
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
