import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/axiosConfig";
import { toast } from "sonner";

import { useEffect, useState } from "react";
import { useTiendaId } from "../../hooks/Tienda/useTiendaId";
import { Label } from "@/components/ui/label";
import { Loading } from "../../components/Loading";

export const EditTienda = () => {
  const { id } = useParams();

  const { data } = useTiendaId(id);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    ruc: "",
    razon_social: "",
    direccion: "",
    encargado: "",
    celular: "",
    nombre_tienda: "",
  });

  const editMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.put(`/tiendas/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Tienda actualizada correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/store");
    },
  });

  // Manejar el submit del formulario
  const submit = (e) => {
    e.preventDefault();
    const copy = { ...form };
    copy.razon_social = copy.nombre_tienda;
    delete copy.nombre_tienda;

    editMutation.mutate(copy); // Fix: Pass form data as argument to mutate function
  };
  useEffect(() => {
    if (data) {
      const copy = { ...data };
      delete copy.productos;
      setForm(copy);
    }
  }, [data]);

  return (
    <div className="">
      {editMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Editar Tiendas</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        {data && (
          <form onSubmit={submit} className="">
            <div className="flex flex-col gap-10 w-full justify-center">
              <div className="w-full flex gap-8">
                <Label className="w-1/3">
                  RUC:
                  <Input
                    className=""
                    type="text"
                    placeholder="Ingrese el RUC"
                    defaultValue={form?.ruc}
                    onChange={(e) => {
                      setForm({ ...form, ruc: e.target.value });
                    }}
                  />
                </Label>
                <Label className="w-1/3">
                  Razon Social:
                  <Input
                    className=""
                    type="text"
                    placeholder="Ingrese la razon social"
                    defaultValue={form?.nombre_tienda}
                    onChange={(e) => {
                      setForm({ ...form, nombre_tienda: e.target.value });
                    }}
                  />
                </Label>
                <Label className="w-1/3">
                  Direccion:
                  <Input
                    className=""
                    type="text"
                    placeholder="Ingrese la dirección"
                    defaultValue={form?.direccion}
                    onChange={(e) => {
                      setForm({ ...form, direccion: e.target.value });
                    }}
                  />
                </Label>
              </div>
              <div className="w-full flex gap-8">
                <Label className="w-1/3">
                  Encargado:
                  <Input
                    className=""
                    type="text"
                    placeholder="Ingrese el encargado"
                    defaultValue={form?.encargado}
                    onChange={(e) => {
                      setForm({ ...form, encargado: e.target.value });
                    }}
                  />
                </Label>
                <Label className="w-1/3">
                  Celular:
                  <Input
                    className=""
                    type="text"
                    placeholder="Ingrese el celular"
                    defaultValue={form?.celular}
                    onChange={(e) => {
                      setForm({ ...form, celular: e.target.value });
                    }}
                  />
                </Label>
                <div className="w-1/3"></div>
              </div>
              <div className=" flex justify-end gap-8 w-full">
                <Button variant={"default"} type="submit">
                  Guardar
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={() => navigate("/admin/store")}
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
