import { useState } from "react";
// Imagenes
import logo from "../../../assets/logo.svg";

// Components
import { Header } from "../components/Header";

// Shadcn
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeaderDesktop } from "../components/HeaderDesktop";
import { useModeloAutoId } from "@/features/Admin/hooks/ModeloAuto/useModeloAutoId";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "../contexts/cartContext";

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

export const SearchModelProducts = () => {
  const { id } = useParams();
  const { addItemToCart } = useCart();

  const { data } = useModeloAutoId(id);
  // console.log(data?.productos);
  return (
    <div>
      <Header />
      <HeaderDesktop />
      <div className="container lg:px-16">
        <div className="py-10 flex flex-col gap-4 md:gap-16">
          {/* Logo e Input Search */}
          <div className="flex flex-col gap-10 md:gap-28 items-center">
            {/* Logo */}
            <div>
              <img src={logo} alt="Deybipart Logo" className="w-64 md:w-96" />
            </div>
          </div>
          <div className="py-10 px-4 flex flex-col gap-4">
            <Tabs defaultValue="lista">
              <TabsList className="flex justify-between items-center">
                <p className="font-semibold">
                  Se encontraron {data?.productos?.length ?? "0"} resultados
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
                      <TableHead>Año I - T</TableHead>
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
                    {data?.productos?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{data.nombre_marca}</TableCell>
                        <TableCell>{data.nombre_modelo}</TableCell>
                        <TableCell>{data.anio_inicio_termino}</TableCell>
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
                <div className="justify-start items-start font-prosto-one flex flex-wrap gap-2 md:gap-4 text-azul py-4">
                  {data?.productos?.map((item) => {
                    console.log(item.imagenes);
                    return (
                      <div
                        className="w-40 lg:w-52 flex flex-col gap-4 py-4 px-2 rounded-lg shadow-lg border-[2px] border-border-gray hover:border-negro"
                        key={item?.id_producto}
                      >
                        <Link
                          to={`/worker/product/${item.id_producto}`}
                          className="flex flex-col items-center gap-2"
                        >
                          <p className="text-base text-center leading-none">
                            {item.nombre_producto}
                          </p>
                          <p className="text-sm">{item.marca_fabricante}</p>
                          <div>
                            <img
                              src={
                                item?.imagenes?.[0] ||
                                "https://th.bing.com/th/id/OIP.7WQXYKGFHH-XyQ07pfqQXgHaDt?rs=1&pid=ImgDetMain"
                              }
                              alt="Imagen de un producto"
                              className="object-cover rounded-lg h-40"
                            />
                          </div>
                          <p>S/. {item.precio_venta}</p>
                        </Link>
                        <Button
                          className=" bg-azul text-blanco font-prosto-one  border-2 border-azul w-full hover:bg-azul"
                          onClick={() => addItemToCart(item)}
                        >
                          Anadir al carrito
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
