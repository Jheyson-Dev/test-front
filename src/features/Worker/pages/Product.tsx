import { Header } from "../components/Header";

// Imagenes
import producto from "../../../assets/product.png";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Shadsn
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { HeaderDesktop } from "../components/HeaderDesktop";
import { Link, useParams } from "react-router-dom";
import { useProductAllData } from "@/features/Worker/hooks/useProductAllData";
import { useCart } from "../contexts/cartContext";
import { toast } from "sonner";

interface Reemplazo {
  codigo: string;
  precio: number;
  marca: string;
  variacion: number;
}
interface Aplicaciones {
  id: number;
  marca: string;
  modelo: string;
  Año: string;
}

export const Product = () => {
  const { id } = useParams();
  const { data, refetch } = useProductAllData(id);

  const { addItemToCart } = useCart();
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    refetch();
  }, [id]);
  useEffect(() => {
    setMainImage(
      data?.imagenes[0]?.img_url ||
        "https://th.bing.com/th/id/OIP.7WQXYKGFHH-XyQ07pfqQXgHaDt?rs=1&pid=ImgDetMain"
    );
  }, [data]);

  return (
    <>
      <Header />
      <HeaderDesktop />
      <div className="container lg:px-16 ">
        <div className="py-10 px-4 flex flex-col gap-4 lg:gap-10 items-center lg:flex-row lg:items-start">
          <div className="flex flex-col items-center gap-4 ">
            {/* Galeria de Imagenes */}
            <div className="w-full max-w-80 flex flex-col gap-2 lg:hidden">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="w-full h-80 cursor-pointer">
                    <img
                      src={mainImage}
                      alt="Imagen de un Producto"
                      className="border-2 border-azul rounded-lg h-80 w-full object-cover"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="flex justify-center">
                  <div className="flex justify-center shadow-2xl rounded-xl  border-2 border-admin-gray/20">
                    <img
                      src={mainImage}
                      alt=""
                      className="h-[500px] rounded-xl "
                    />
                  </div>

                  <div className="flex gap-2 flex-col justify-center">
                    {data?.imagenes.map((image, index) => {
                      return (
                        <div
                          key={index}
                          className=" shadow-2xl rounded-xl  border-2 border-admin-gray/20 w-32 cursor-pointer h-28 overflow-hidden"
                          onClick={() => setMainImage(image.img_url)}
                        >
                          <img
                            src={image.img_url}
                            alt="Imagen de un producto"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      );
                    })}
                  </div>
                </DialogContent>
              </Dialog>
              <div className="grid grid-cols-3 gap-2">
                {data?.imagenes.map((image, index) => {
                  return (
                    <div
                      key={index}
                      className="border-azul border-2 rounded-lg w- cursor-pointer h-28 overflow-hidden bg-blanco"
                      onClick={() => setMainImage(image?.img_url)}
                    >
                      <img
                        src={image?.img_url}
                        alt="Imagen de un producto"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  );
                })}
              </div>
              {/* <span className="text-red-text font-prosto-one text-2xl absolute  left-4 top-20 -rotate-45">
              S/.100.00
            </span> */}
            </div>
            {/* Galeria de imagenes desktop */}
            <div className="w-full max-w-80 flex-col gap-2 hidden lg:flex">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="w-full h-80 cursor-pointer">
                    <img
                      src={mainImage}
                      alt="Imagen de un Producto"
                      className="border-2 border-azul rounded-lg h-80 w-full object-cover"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="flex justify-center">
                  <div className="flex justify-center shadow-2xl rounded-xl  border-2 border-admin-gray/20">
                    <img
                      src={mainImage}
                      alt=""
                      className="h-[500px] rounded-xl "
                    />
                  </div>

                  <div className="flex gap-2 flex-col justify-center">
                    {data?.imagenes.map((image, index) => {
                      return (
                        <div
                          key={index}
                          className=" shadow-2xl rounded-xl  border-2 border-admin-gray/20 w-32 cursor-pointer h-28 overflow-hidden"
                          onClick={() => setMainImage(image.img_url)}
                        >
                          <img
                            src={image.img_url}
                            alt="Imagen de un producto"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      );
                    })}
                  </div>
                </DialogContent>
              </Dialog>
              <div className="grid grid-cols-3 gap-2">
                {data?.imagenes.map((image, index) => {
                  return (
                    <div
                      key={index}
                      className="border-azul border-2 rounded-lg w- cursor-pointer h-28 overflow-hidden bg-blanco"
                      onClick={() => setMainImage(image?.img_url)}
                    >
                      <img
                        src={image?.img_url}
                        alt="Imagen de un producto"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-80 bg-transparent"></div>
          </div>
          {/* Datos del Producto */}
          <div className="flex flex-col justify-start w-full text-azul gap-4">
            <div className="flex justify-between">
              <p className=" text-2xl font-prosto-one">
                {data?.codigo_interno}
              </p>
              <Button
                variant={"default"}
                onClick={() => {
                  toast.success("Agregando al carrito", {
                    style: {
                      backgroundColor: "#10B981",
                      color: "#fff",
                    },
                  });

                  addItemToCart(data);
                }}
              >
                Agregar al Carrito
              </Button>
            </div>
            <p className="text-3xl font-poppins font-semibold">
              {data?.nombre_producto}
            </p>
            <p className="text-lg">{data?.descripcion}</p>
            <p className="text-2xl font-poppins font-semibold ">
              Especificaciones
            </p>
            <div className="flex justify-between">
              <div className="flex text-sm font-poppins px-4">
                <div className=" w-36">
                  {data?.campo_medicion.split(" - ").map((campo, index) => {
                    return <div key={index}>{campo}:</div>;
                  })}
                </div>
                <div>
                  {data?.medida.split(" ").map((campo, index) => {
                    return <div key={index}>{campo}</div>;
                  })}
                </div>
              </div>
              <div className="flex text-base font-poppins  px-4">
                <div className=" w-36">
                  <div>Multiplos de:</div>
                  <div>Marca:</div>
                  <div>Origen:</div>
                  {/* <div>Stock:</div> */}
                </div>
                <div>
                  <div>{data?.multiplos}</div>
                  <div>{data?.marca_fabricante}</div>
                  <div>{data?.origen}</div>
                  {/* <div>{data?.stock_total}</div> */}
                </div>
              </div>
            </div>
            <p className="text-2xl font-poppins font-semibold ">Stock</p>
            <div>
              <div className="flex justify-between px-4">
                <div className="flex gap-2">
                  <div className="flex flex-col gap-2 w-36 text-sm font-poppins font-semibold">
                    {data?.tiendas.map((tienda, index) => {
                      return <div key={index}>{tienda.razon_social}:</div>;
                    })}
                  </div>
                  <div className="flex flex-col gap-2 text-sm font-semibold">
                    {data?.tiendas.map((tienda, index) => {
                      return <div key={index}>{tienda.stock}</div>;
                    })}
                  </div>
                </div>
                {/* <div>
                  <Button
                    className="bg-azul text-blanco"
                    onClick={() => alert("Enviando correo")}
                  >
                    Solicitar Stock
                  </Button>
                </div> */}
              </div>
            </div>
            <p className="text-2xl font-poppins font-semibold ">Reemplazos</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Codigo</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Marca</TableHead>
                  <TableHead>Variacion</TableHead>
                  <TableHead>Nota</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.reemplazos.map((reemplazo, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-amarillo underline cursor-pointer">
                      <Link
                        to={`/worker/product/${reemplazo.id_producto_reemplazo}`}
                        onClick={() => {
                          window.scrollTo(0, 0);
                          refetch();
                        }}
                        // onClick={() => window.location.reload()}
                      >
                        {reemplazo.id_producto_reemplazo}
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium">
                      S/.{reemplazo.producto_reemplazo?.precio_venta}
                    </TableCell>
                    <TableCell className="font-medium">
                      {reemplazo?.producto_reemplazo?.marca_fabricante}
                    </TableCell>
                    <TableCell className="font-medium">
                      {reemplazo.variacion}%
                    </TableCell>
                    <TableCell className="font-medium">
                      {reemplazo.notas}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-2xl font-poppins font-semibold text-azul">
              Aplicaciones
            </p>
            <Table>
              <TableBody>
                <TableRow>
                  <TableHead>Marca</TableHead>
                  <TableHead>Modelo</TableHead>
                  <TableHead>Año</TableHead>
                </TableRow>
              </TableBody>
              <TableBody>
                {data?.aplicaciones.map((aplicacion, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {aplicacion.nombre_marca}
                    </TableCell>
                    <TableCell className="font-medium">
                      {aplicacion.nombre_modelo}
                    </TableCell>
                    <TableCell className="font-medium">
                      {aplicacion.anio_inicio_termino}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};
