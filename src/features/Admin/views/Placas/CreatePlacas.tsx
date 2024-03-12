import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/utils/axiosConfig";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Shadcn
import { useState } from "react";
import { Loading } from "../../components/Loading";

export const CreatePlacas = () => {
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState(null);

  const [form, setForm] = useState({
    placa: "",
    serie_vin: "",
    file: null,
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/autos", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Placa creada correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/plates");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("placa", form.placa);
    data.append("serie_vin", form.serie_vin);
    data.append("file", form.file);

    createMutation.mutate(data);
  };
  return (
    <div className="">
      {createMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Crear Placa</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        <form onSubmit={onSubmit} className="">
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-10">
              <div className="w-1/2 flex flex-col gap-8">
                <Label>
                  Placa:
                  <Input
                    className=""
                    type="text"
                    placeholder="Ingrese la placa"
                    onChange={(e) => {
                      setForm({ ...form, placa: e.target.value });
                    }}
                  />
                </Label>
                <Label>
                  Serie Y/o VIN:
                  <Input
                    className=""
                    type="text"
                    placeholder="Ingrese la serie y/o vin"
                    onChange={(e) => {
                      setForm({ ...form, serie_vin: e.target.value });
                    }}
                  />
                </Label>
                <Label>
                  Imagen:
                  <Input
                    className=""
                    type="file"
                    placeholder=""
                    onChange={(e) => {
                      setForm({ ...form, file: e.target.files[0] });
                      const prevURL = URL.createObjectURL(e.target.files[0]);
                      setPreviewImage(prevURL);
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
              <Button type="submit">Guardar</Button>
              <Button
                variant={"destructive"}
                onClick={() => navigate("/admin/user")}
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
