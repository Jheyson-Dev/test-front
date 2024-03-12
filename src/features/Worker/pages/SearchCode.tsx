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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCodeProduct } from "@/features/Client/hooks/useCodeProduct";
import { useCart } from "../contexts/cartContext";
import { InputContext } from "../contexts/InputHomeContext";

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

  const { inputValue, setInputValue } = useContext(InputContext);

  const { addItemToCart } = useCart();

  const { data } = useCodeProduct(inputValue);
  console.log(data);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                    <TableHead>Año I-T</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Origen</TableHead>
                    <TableHead>Marca</TableHead>
                    <TableHead>Código Interno</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Stock</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.nombre_marca}</TableCell>
                      <TableCell>{item.nombre_modelo}</TableCell>
                      <TableCell>
                        <span className="flex justify-center w-10 overflow-hidden overflow-ellipsis">
                          {item.anio_inicio_termino}
                        </span>
                      </TableCell>
                      <TableCell>{item.nombre_producto}</TableCell>
                      <TableCell>{item.descripcion}</TableCell>
                      <TableCell>{item.origen}</TableCell>
                      <TableCell>{item.marca_fabricante}</TableCell>
                      <TableCell>
                        <Link
                          to={`/worker/product/${item.id_producto}`}
                          className="underline text-amarillo"
                        >
                          {item.codigo_interno}
                        </Link>
                      </TableCell>
                      <TableCell>{item.precio_venta}</TableCell>
                      <TableCell>{item.total_stock}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="imagenes" className="">
              <div className="font-prosto-one flex flex-wrap gap-2 md:gap-4 justify-start text-azul py-4">
                {data?.map((item, index) => (
                  <div
                    className="w-40 lg:w-52 flex flex-col gap-4 py-4 px-2 rounded-lg shadow-lg border-[2px] border-border-gray hover:border-negro"
                    key={index}
                  >
                    <Link
                      to={`/worker/product/${item.id_producto}`}
                      className="flex flex-col gap-2 items-center"
                    >
                      <p className="text-base text-center leading-none">
                        {item.nombre_producto}
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
                    </Link>
                    <Button
                      className=" bg-azul text-blanco font-prosto-one  border-2 border-azul w-full hover:bg-azul"
                      onClick={() => {
                        const newItem = {
                          ...item,
                          imagenes: [item.url_imagen_producto],
                        };
                        addItemToCart(newItem);
                      }}
                    >
                      Anadir al carrito
                    </Button>
                  </div>
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
