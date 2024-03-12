import { Input } from "@/components/ui/input";
import { Header } from "../components/Header";
import { HeaderDesktop } from "../components/HeaderDesktop";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import tabla from "../../../assets/tabla-conversion.jpg";

import { Badge } from "@/components/ui/badge";

// shadcn

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import logo from "../../../assets/logo.svg";
import { Label } from "@radix-ui/react-label";
import { useCategoriaAll } from "@/features/Admin/hooks/Categoria/useCategoriaAll";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export const SearchMedida = () => {
  const { data: categorias } = useCategoriaAll();
  const [id, setId] = useState(null);

  const [search, setSearch] = useState("");

  const [categoria, setCategoria] = useState({
    campo_medicion: "",
    id_categoria: 0,
    nombre_producto: "",
    url_campo_medicion: "",
  });
  return (
    <div>
      <Header />
      <HeaderDesktop />
      <div className="container lg:px-16">
        <div className="py-10 px-4 flex flex-col gap-4 md:gap-16">
          <div className="flex flex-col gap-10 md:gap-10 items-center">
            {/* Logo */}
            <div>
              <img src={logo} alt="Deybipart Logo" className="w-64 md:w-96" />
            </div>
            {/* Input Search */}
            <div className="flex w-full items-center justify-between gap-10">
              <div className="flex gap-2 flex-wrap ">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="border-azul border-2"
                    >
                      Tabla de conversion
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[1200px]">
                    <div className="flex justify-center">
                      <img src={tabla} alt="" />
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="min-w-40 border-azul border-2"
                    >
                      {categoria.nombre_producto
                        ? categoria.nombre_producto
                        : "Seleccione una categoria"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[1200px]">
                    <div className="flex justify-center">
                      <img
                        src={categoria.url_campo_medicion}
                        alt=""
                        className="w-96"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
                {/* <Badge variant={"outline"} className="rounded-md font-semibold">
                  <span className="text-sm">
                    {categoria.campo_medicion
                      ? categoria.campo_medicion
                      : "Seleccione una categoria"}
                  </span>
                </Badge> */}
                {/* <Button variant={"outline"} className="min-w-40">
                  {categoria.campo_medicion
                    ? categoria.campo_medicion
                    : "Seleccione una categoria"}
                </Button> */}
              </div>
            </div>
            <div className="w-full flex gap-4 min-h-[50vh]">
              <div className="w-1/6 ">
                <h2 className="text-2xl font-semibold mb-4  text-center font-poppins text-admin-gray">
                  Categorias
                </h2>
                <div className="flex flex-col gap-2">
                  {categorias?.map((item) => (
                    <Link
                      to={`/worker/search-medida/${item.id_categoria}`}
                      className="flex items-center gap-2 p-2 bg-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border-2 border-admin-gray/10 font-semibold font-poppins text-admin-gray justify-center"
                      key={item.id_categoria}
                      onClick={() => {
                        setId(item.id_categoria);
                        setCategoria(item);
                      }}
                    >
                      {item.nombre_producto}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="w-5/6">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
