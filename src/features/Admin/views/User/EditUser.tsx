import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useUser } from "../../hooks/useUserId";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/axiosConfig";
import { toast } from "sonner";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Loading } from "../../components/Loading";

interface formData {
  username: string;
  password: string;
  rol: string;
}

export const EditUser = () => {
  const { id } = useParams();
  const { data } = useUser(id ? { id } : { id: "" });
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    rol: "",
  });

  const editMutation = useMutation({
    mutationFn: async (data: formData) => {
      const response = await api.put(`/usuarios/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Usuario actualizado", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/user");
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

      <p className="text-2xl font-poppins font-semibold">Editar Usuario</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        {data && (
          <form onSubmit={submit} className="">
            <div className="flex flex-col gap-10 w-full justify-center">
              <div className="w-full flex gap-8">
                <Label className="w-1/3">
                  Usuario:
                  <Input
                    className=""
                    type="text"
                    placeholder="Ingrese el usuario"
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                    defaultValue={form?.username}
                  />
                </Label>

                <Label className="w-1/3">
                  Rol:
                  <Input
                    className=""
                    type="text"
                    disabled
                    placeholder="Ingrese el rol del usuario"
                    value={form?.rol}
                  />
                </Label>

                <Label className="w-1/3">
                  Contraseña:
                  <Input
                    className=""
                    type="password"
                    placeholder="Ingrese el correo del usuario"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    defaultValue={form?.password}
                  />
                </Label>
              </div>
              <div className=" flex justify-end gap-8 w-full">
                <Button variant={"default"} type="submit">
                  Guardar
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={() => navigate("/admin/user")}
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
