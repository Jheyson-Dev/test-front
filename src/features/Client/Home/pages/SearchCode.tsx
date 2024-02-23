// Componentes
import { Header } from "../components/Header";

// Imagenes
import logo from "../../../../assets/logo.svg";

// Shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Icons
import { Search } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

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
  const [busqueda, setBusqueda] = useState(false);
  const [vistaLista, setVistaLista] = useState(true);

  // Funciones para manejar eventos
  const handleClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") setBusqueda(!busqueda);
  };

  // Funciones para modificar el estado
  const changeView = () => {
    setVistaLista(!vistaLista);
  };

  //   Inicializacion de datos
  const product: Array<ProducSearch> = [
    {
      marca: "Toyota",
      modelo: "Corolla",
      anioI: "2019",
      anioT: "2021",
      producto: "Bumper",
      descripcion: "Bumper delantero",
      origen: "Taiwan",
      marcap: "STP",
      codigo: "123456",
      precio: 100,
      stock: 10,
      imagen:
        "https://preview.redd.it/nino-nakano-the-quintessential-quintuplets-v0-up5rth2tldlb1.jpg?width=1300&format=pjpg&auto=webp&s=83fa898f70e0d6f765249ff3d1d1b282b2715100",
    },
  ];
  return (
    <div>
      <Header />
      <div className="py-10 px-4 flex flex-col gap-4 -z-20">
        {/* Logo e Input Search */}
        <div className="flex flex-col gap-10 items-center">
          {/* Logo */}
          <div>
            <img src={logo} alt="Deybipart Logo" className="w-64" />
          </div>
          {/* Input Search */}
          <div className="flex w-full items-center">
            <Input
              type="text"
              placeholder="Ingrese el código de referencia"
              className="placeholder:font-prosto-one placeholder:text-base border-2 border-r-0 rounded-r-none border-border-gray focus-visible:ring-0 focus-visible:ring-offset-0"
              onKeyDown={(e) => handleClick(e)}
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
        <div className="flex justify-between items-center">
          <p>200 resultados</p>
          {/* Boton cambio de vista */}
          <div className="flex border-2 border-azul rounded-lg">
            <div
              className={`${vistaLista ? "bg-azul text-blanco" : ""} px-2`}
              onClick={changeView}
            >
              Lista
            </div>
            <div
              className={`${vistaLista ? "" : "bg-azul text-blanco"} px-2`}
              onClick={changeView}
            >
              Imagenes
            </div>
          </div>
        </div>
        {/* Vistas Lista o Imagenes  */}
        {vistaLista ? (
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead>Marca</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Año Inicio</TableHead>
                <TableHead>Año Termino</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Origen</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.marca}</TableCell>
                  <TableCell>{item.modelo}</TableCell>
                  <TableCell>{item.anioI}</TableCell>
                  <TableCell>{item.anioT}</TableCell>
                  <TableCell>{item.producto}</TableCell>
                  <TableCell>{item.descripcion}</TableCell>
                  <TableCell>{item.origen}</TableCell>
                  <TableCell>{item.marcap}</TableCell>
                  <TableCell>{item.codigo}</TableCell>
                  <TableCell>{item.precio}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="font-prosto-one text-azul">
            <Link
              to={`/product/2`}
              className={`w-44 flex flex-col items-center gap-2 py-4 px-2 rounded-lg shadow-lg border-[1px] border-border-gray 
                  `}
            >
              <p className="text-base text-center leading-none">
                Nombrecito Producto
              </p>
              <p className="text-sm">Marca</p>
              <div>
                <img
                  src={
                    "https://preview.redd.it/nino-nakano-the-quintessential-quintuplets-v0-up5rth2tldlb1.jpg?width=1300&format=pjpg&auto=webp&s=83fa898f70e0d6f765249ff3d1d1b282b2715100"
                  }
                  alt="Imagen de un producto"
                />
              </div>
              <p>S/. 100.00</p>
              <Button
                className="bg-azul text-blanco font-prosto-one  border-2 border-azul w-full hover:bg-azul"
                // onClick={() => alert("Añadir al carrito")}
              >
                Ver producto
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
