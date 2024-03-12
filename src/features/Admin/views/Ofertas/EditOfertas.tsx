import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/axiosConfig";
import { toast } from "sonner";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { useOfertasById } from "../../hooks/Ofertas/useOfertasById";

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
import { Loading } from "../../components/Loading";

export const EditOfertas = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data } = useOfertasById(id);

  const [form, setForm] = useState({
    id_producto: "",
    descripcion: "",
    priorizacion: "",
    descuento: "",
  });

  const editMutation = useMutation({
    mutationFn: async (data: formData) => {
      const response = await api.put(`/ofertas/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Oferta actualizada", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/offer");
    },
  });

  // Manejar el submit del formulario
  const submit = (e) => {
    e.preventDefault();

    editMutation.mutate(form); // Fix: Pass form data as argument to mutate function
  };
  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);
  return (
    <div className="">
      {editMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Editar Oferta</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        {data && (
          <form onSubmit={submit} className="">
            <div className="flex flex-col gap-10 w-full justify-center">
              <div className="w-full flex gap-8">
                <Label className="w-1/3">
                  Producto:
                  <Input
                    className=""
                    type="text"
                    disabled
                    placeholder="Ingrese la descripcion de la oferta"
                    defaultValue={form?.id_producto}
                  />
                </Label>
                <div className="w-1/3 grid gap-15 font-semibold">
                  Priorizacion:
                  <Select
                    onValueChange={(value) => {
                      console.log(value);
                      setForm({ ...form, priorizacion: value });
                    }}
                    defaultValue={`${form.priorizacion}`}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={`SI`}>SI</SelectItem>
                        <SelectItem value={`NO`}>NO</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Label className="w-1/3">
                  Precio Oferta:
                  <Input
                    className=""
                    type="text"
                    placeholder="Ingrese la descripcion de la oferta"
                    defaultValue={form?.descuento}
                  />
                </Label>
              </div>
              <div className="w-full flex gap-8">
                <Label className="w-full">
                  Descripcion:
                  <Input
                    className=""
                    type="text"
                    placeholder="Ingrese la descripcion de la oferta"
                    defaultValue={form?.descripcion}
                  />
                </Label>
              </div>
              <div className=" flex justify-end gap-8 w-full">
                <Button variant={"default"} type="submit">
                  Guardar
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={() => navigate("/admin/offer")}
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
