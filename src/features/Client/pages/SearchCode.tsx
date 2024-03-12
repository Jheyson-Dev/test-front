// Componentes
import { Header } from "../components/Header";

// Imagenes
import logo from "../../../assets/logo.svg";

// Shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Icons
import { Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { HeaderDesktop } from "../components/HeaderDesktop";
import { TopButton } from "../components/TopButton";
import { useCodeProduct } from "../hooks/useCodeProduct";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputClientContext } from "../contexts/inputSearch";
import { InputContext } from "@/features/Worker/contexts/InputHomeContext";

// Interfaces
interface ProducSearch {
  marca: string;
  modelo: string;
  anioI: string;
  anioT: string;
  producto: string;
  descripcion: string;
  origen: string;
  marcap: string;
  codigo: string;
  precio: number;
  stock: number;
  imagen: string;
}

export const SearchCode = () => {
  // Estados del componente
  // const [search, setSearch] = useState("");
  const { inputValue, setInputValue } = useContext(InputContext);

  const { data } = useCodeProduct(inputValue);
  console.log(data);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="relative">
      <Header />
      <HeaderDesktop />
      <div className="container lg:px-16">
        <div className="py-10 px-4 flex flex-col gap-4 md:gap-16">
          {/* Logo e Input Search */}
          <div className="flex flex-col gap-10 md:gap-28 items-center">
            {/* Logo */}
            <div>
              <img src={logo} alt="Deybipart Logo" className="w-64 md:w-96" />
            </div>
            {/* Input Search */}
            <div className="flex w-full items-center">
              <Input
                type="text"
                placeholder="Ingrese el código de referencia"
                className="placeholder:font-prosto-one placeholder:text-base border-2 border-r-0 rounded-r-none border-border-gray focus-visible:ring-0 focus-visible:ring-offset-0"
                defaultValue={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
              <Button
                type="submit"
                className="bg-bg-search  rounded-l-none border-2 border-l-0 border-border-gray text-azul hover:bg-azul hover:text-blanco"
                onClick={() => alert("Buscando")}
              >
                <Search
                  size={24}
                  // color="#052452"
                  strokeWidth={3}
                />
              </Button>
            </div>
          </div>

          {/* Resultados y Cambio de Vista */}

          <Tabs defaultValue="lista">
            <TabsList className="flex justify-between items-center">
              <p className="font-semibold">
                Se encontraron {data?.length ?? "0"} resultados
              </p>
              <div>
                <TabsTrigger value="lista">Lista</TabsTrigger>
                <TabsTrigger value="imagenes">Imagenes</TabsTrigger>
              </div>
            </TabsList>
            <TabsContent value="lista" className="">
              <Table className="">
                <TableHeader>
                  <TableRow>
                    <TableHead>Marca</TableHead>
                    <TableHead>Modelo</TableHead>
                    <TableHead>Año Inicio - Año Termino</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Origen</TableHead>
                    <TableHead>Marca</TableHead>
                    <TableHead>Código Interno</TableHead>
                    <TableHead>Precio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.nombre_marca}</TableCell>
                      <TableCell>{item.nombre_modelo}</TableCell>
                      <TableCell>{item.anio_inicio_termino}</TableCell>
                      <TableCell>{item.nombre_producto}</TableCell>
                      <TableCell>{item.descripcion}</TableCell>
                      <TableCell>{item.origen}</TableCell>
                      <TableCell>{item.marca_fabricante}</TableCell>
                      <TableCell>
                        <Link
                          to={`/product/${item.id_producto}`}
                          className="underline text-amarillo"
                        >
                          {item.codigo_interno}
                        </Link>
                      </TableCell>
                      <TableCell>{item.precio_venta}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="imagenes" className="">
              <div className="font-prosto-one flex flex-wrap gap-2 md:gap-4 justify-start text-azul py-4">
                {data?.map((item) => (
                  <Link
                    to={`/product/${item.id_producto}`}
                    className={`w-44 lg:w-52 flex flex-col items-center gap-2 py-4 px-2 rounded-lg shadow-lg border-[1px] border-border-gray 
                  `}
                  >
                    <p className="text-base text-center leading-none">
                      {item?.nombre_producto}
                    </p>
                    <p className="text-sm">{item.marca_fabricante}</p>
                    <div>
                      <img
                        src={
                          item?.imagenes[0]?.img_url
                            ? item?.imagenes[0]?.img_url
                            : "https://th.bing.com/th/id/R.ed641760a1851c7f97c90d3ba5fa905e?rik=%2fo%2bpK9MvGSZdMQ&pid=ImgRaw&r=0"
                        }
                        alt="Imagen de un producto"
                        className="object-cover rounded-lg h-40"
                      />
                    </div>
                    <p>S/. {item.precio_venta}</p>
                    <Button
                      className="bg-azul text-blanco font-prosto-one  border-2 border-azul w-full hover:bg-azul mt-2"
                      // onClick={() => alert("Añadir al carrito")}
                    >
                      Ver producto
                    </Button>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <TopButton />
      </div>
    </div>
  );
};
