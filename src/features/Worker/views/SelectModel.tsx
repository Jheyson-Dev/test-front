import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMarcaModel } from "@/features/Client/hooks/useMarcaModel";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const SelectModel = () => {
  // Hooks React Router Dom
  const { id } = useParams();

  const { data, refetch } = useMarcaModel(id);
  console.log(data);

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
          {data?.modelos_auto.map((item, index) => (
            <TableRow className="cursor-pointer" key={index}>
              <TableCell>
                <img
                  src={
                    item.img_url_modelo ||
                    "https://th.bing.com/th/id/OIP.7WQXYKGFHH-XyQ07pfqQXgHaDt?rs=1&pid=ImgDetMain"
                  }
                  alt="Imagen del modelo de auto"
                  className="w-10 h-10 object-cover"
                />
              </TableCell>
              <TableCell>
                <Link
                  to={`/worker/search-model/product/${item.id_modelo_auto}`}
                  className="underline text-amarillo"
                >
                  {item.nombre_modelo}
                </Link>
              </TableCell>
              <TableCell>{item.anio_inicio_termino}</TableCell>
              <TableCell>({item.cantidad_productos})</TableCell>
            </TableRow>
          ))}

          {data?.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No hay modelos para mostrar
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
