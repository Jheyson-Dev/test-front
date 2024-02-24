import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const SelectModel = () => {
  // Hooks React Router Dom
  const { id } = useParams();
  //  Efecto secundario
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("tabla-modelos")?.scrollTo(0, 0);
  }, [id]);
  return (
    <div className="overflow-auto h-96" id="tabla-modelos">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Año</TableHead>
            <TableHead>Productos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <TableRow className="cursor-pointer" key={item}>
              <TableCell>
                <div className="flex justify-center">
                  <img
                    src="https://preview.redd.it/nino-nakano-the-quintessential-quintuplets-v0-up5rth2tldlb1.jpg?width=1300&format=pjpg&auto=webp&s=83fa898f70e0d6f765249ff3d1d1b282b2715100"
                    alt="Imagen del modelo de auto"
                    className="w-10 bg-red-500"
                  />
                </div>
              </TableCell>
              <TableCell>
                <Link to={`/search-model/product/${id}`}>
                  Astra 2000 C20SEL DOHC
                </Link>
              </TableCell>
              <TableCell>1999-2005</TableCell>
              <TableCell>({id})</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
