import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/utils/axiosConfig";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loading } from "../../components/Loading";

export const ImportExcel = () => {
  const navigate = useNavigate();

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/upload-excel", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },

    onSuccess: () => {
      toast.success("Importacion correcta", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      navigate("/admin/product");
    },
  });

  const [form, setForm] = useState({
    file: null,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("excel", form.file);

    createMutation.mutate(data);
  };

  return (
    <div className="">
      {createMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Importar datos</p>
      <div className="shadow-2xl rounded-xl p-10 mt-14  border-2 border-admin-gray/10">
        <div className="flex flex-col">
          <a
            href="https://deybiparts.nyc3.cdn.digitaloceanspaces.com/plantillaDeybiMotorsOficial.xlsx"
            target="_blank"
            download
          >
            <Button className="max-w-40" size={"sm"}>
              Descargar Plantilla
            </Button>
          </a>
          <form onSubmit={onSubmit} className="w-full flex flex-col mt-10">
            <div className="flex items-center gap-10">
              <Label>
                Seleccionar archivo:
                <Input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const fileExtension = file.name.split(".").pop();

                    if (fileExtension !== "xlsx") {
                      alert("Por favor, selecciona un archivo .xlsx");
                      return;
                    }

                    setForm({ ...form, file: file });
                  }}
                />
              </Label>
            </div>
            <div className=" flex justify-end gap-8 w-full">
              <Button
                variant={"default"}
                type="submit"
                disabled={form.file === null}
              >
                Guardar
              </Button>
              <Button
                variant={"destructive"}
                onClick={() => navigate("/admin/product")}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
        {/* <form className="flex gap-8" onSubmit={subir}>
          <input
            type="file"
            onChange={(e) => {
              setImagen(e.target.files[0]);
            }}
          />
          <Button>Subir</Button>
        </form> */}
      </div>
    </div>
  );
};

// https://deybiparts.nyc3.cdn.digitaloceanspaces.com/plantillaDeybiMotorsOficial.xlsx
