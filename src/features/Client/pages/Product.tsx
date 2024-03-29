import { Header } from "../components/Header";

// Imagenes
import { Button } from "@/components/ui/button";

// Shadsn
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { HeaderDesktop } from "../components/HeaderDesktop";
import { Link, useParams } from "react-router-dom";
import { useProductAllData } from "../hooks/useProductAllData";

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

  const [mainImage, setMainImage] = useState("");

  const openWhatsApp = (data) => {
    const codigo_interno = data.codigo_interno;
    const marca = data.marca_fabricante;
    const origen = data.origen;
    const phoneNumber = "51902401714";
    const message = `Estoy interesado en el producto con codigo ${codigo_interno} de la marca ${marca} de origen ${origen}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

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
                      className="border-2 border-azul rounded-lg h-80 w-full object-contain"
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
                            className="object-contain w-full h-full"
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
                        className="object-contain w-full h-full"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Galeria de imagenes desktop */}
            <div className="w-full max-w-80 flex-col gap-2 hidden lg:flex">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="w-full h-80 cursor-pointer">
                    <img
                      src={mainImage}
                      alt="Imagen de un Producto"
                      className="border-2 border-azul rounded-lg h-80 w-full object-contain"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="flex justify-center">
                  <div className="flex justify-center shadow-2xl rounded-xl  border-2 border-admin-gray/20">
                    <img
                      src={mainImage}
                      alt=""
                      className="h-[500px] rounded-xl object-contain"
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
                            className="object-contain w-full h-full"
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
                        className="object-contain w-full h-full"
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
                className="w-80 flex gap-2 font-prosto-one text-base bg-verde-whatsapp"
                onClick={() => openWhatsApp(data)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"
                  />
                </svg>
                Consultar Descuento
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
                        to={`/product/${reemplazo.id_producto_reemplazo}`}
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
