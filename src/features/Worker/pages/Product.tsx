import { Header } from "../components/Header";

// Imagenes
import producto from "../../../assets/product.png";
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
import { useEffect, useState } from "react";
import { HeaderDesktop } from "../components/HeaderDesktop";
import { Link, useParams } from "react-router-dom";

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

const reemplazos: Array<Reemplazo> = [
  {
    codigo: "0099533",
    precio: 12.5,
    marca: "STP",
    variacion: 10.0,
  },
  {
    codigo: "0099534",
    precio: 12.5,
    marca: "STP",
    variacion: 10.0,
  },
];
const aplicaciones: Aplicaciones[] = [
  {
    id: 1,
    marca: "BYD",
    modelo: "FO 1000 371QA",
    Año: "2010-2014",
  },
  {
    id: 2,
    marca: "BYD",
    modelo: "FO 1000 371QA",
    Año: "2010-2014",
  },
  {
    id: 3,
    marca: "BYD",
    modelo: "FO 1000 371QA",
    Año: "2010-2014",
  },
  {
    id: 4,
    marca: "BYD",
    modelo: "FO 1000 371QA",
    Año: "2010-2014",
  },
];

export const Product = () => {
  const { id } = useParams();
  const [mainImage, setMainImage] = useState(producto);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <Header />
      <HeaderDesktop />
      <div className="container lg:px-16 ">
        <div className="py-10 px-4 flex flex-col gap-4 lg:gap-10 items-center lg:flex-row lg:items-start">
          <div className="flex flex-col items-center gap-4 ">
            {/* Galeria de Imagenes */}
            <div className="w-full max-w-80 flex flex-col gap-2">
              <div className="w-full h-80">
                <img
                  src={mainImage}
                  alt="Imagen de un Producto"
                  className="border-2 border-azul rounded-lg h-80 w-full"
                />
              </div>
              <div className="flex gap-2">
                <div
                  className="border-azul border-2 rounded-lg w-32 cursor-pointer"
                  onClick={() => setMainImage(producto)}
                >
                  <img src={producto} alt="Imagen de un producto" />
                </div>
                <div
                  className="border-azul border-2 rounded-lg w-32 cursor-pointer"
                  onClick={() =>
                    setMainImage(
                      "https://preview.redd.it/nino-nakano-the-quintessential-quintuplets-v0-up5rth2tldlb1.jpg?width=1300&format=pjpg&auto=webp&s=83fa898f70e0d6f765249ff3d1d1b282b2715100"
                    )
                  }
                >
                  <img
                    src={
                      "https://preview.redd.it/nino-nakano-the-quintessential-quintuplets-v0-up5rth2tldlb1.jpg?width=1300&format=pjpg&auto=webp&s=83fa898f70e0d6f765249ff3d1d1b282b2715100"
                    }
                    className="cursor-pointer"
                    alt="Imagen de un producto"
                  />
                </div>
                <div className="border-azul border-2 rounded-lg w-32 cursor-pointer">
                  <img
                    src={
                      "https://preview.redd.it/nino-by-%E3%81%84%E3%81%97%E3%82%86%E3%81%8D-v0-gmmyg1ax6alb1.jpg?width=1300&format=pjpg&auto=webp&s=fb2b13f630baae254838142e018f6a4f16f2b9bf"
                    }
                    alt="Imagen de un producto"
                    onClick={() =>
                      setMainImage(
                        "https://preview.redd.it/nino-by-%E3%81%84%E3%81%97%E3%82%86%E3%81%8D-v0-gmmyg1ax6alb1.jpg?width=1300&format=pjpg&auto=webp&s=fb2b13f630baae254838142e018f6a4f16f2b9bf"
                      )
                    }
                  />
                </div>
              </div>
              {/* <span className="text-red-text font-prosto-one text-2xl absolute  left-4 top-20 -rotate-45">
              S/.100.00
            </span> */}
            </div>
            {/* Boton de Whatsap */}
            <Button className="w-80 flex gap-2 font-prosto-one text-base bg-verde-whatsapp">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24 text-blanco"
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
          {/* Datos del Producto */}
          <div className="flex flex-col justify-start w-full text-azul gap-4">
            <p className=" text-2xl font-prosto-one">Codigo {id}</p>
            <p className="text-3xl font-poppins font-semibold">Filtro aceite</p>
            <p className="text-lg">aqui va un descripcion del producto</p>
            <p className="text-2xl font-poppins font-semibold ">
              Especificaciones
            </p>
            <div className="flex text-base font-poppins  px-4">
              <div className=" w-32">
                <div>Multiplos de:</div>
                <div>Marca:</div>
                <div>Origen:</div>
                <div>Stock:</div>
              </div>
              <div className="w-32">
                <div>1</div>
                <div>STP</div>
                <div>MULTI-ORIGEN</div>
                <div>16</div>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {reemplazos.map((reemplazo, index) => (
                  <TableRow key={reemplazo.codigo} className={`text-center`}>
                    <TableCell className="font-medium text-amarillo underline cursor-pointer">
                      <Link
                        to={`/worker/product/${reemplazo.codigo}${index + 1}`}
                      >
                        {reemplazo.codigo}
                        {index + 1}
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium">
                      S/.{reemplazo.precio}
                    </TableCell>
                    <TableCell className="font-medium">
                      {reemplazo.marca}
                    </TableCell>
                    <TableCell className="font-medium">
                      {reemplazo.variacion}%
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
                {aplicaciones.map((aplicacion) => (
                  <TableRow key={aplicacion.id} className="text-center">
                    <TableCell className="font-medium">
                      {aplicacion.marca}
                    </TableCell>
                    <TableCell className="font-medium">
                      {aplicacion.modelo}
                    </TableCell>
                    <TableCell className="font-medium">
                      {aplicacion.Año}
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
