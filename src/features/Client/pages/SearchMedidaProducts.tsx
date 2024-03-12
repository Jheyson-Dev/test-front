import { useModeloAutoId } from "@/features/Admin/hooks/ModeloAuto/useModeloAutoId";
import { Link, useParams } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useCategoriaId } from "@/features/Admin/hooks/Categoria/useCategoriaId";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const SearchMedidaProducts = () => {
  const { id } = useParams();
  const { data } = useCategoriaId(id);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);

  const filterData = filter?.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );
  console.log(filterData);

  useEffect(() => {
    if (data) {
      setFilter(data.productos);
    }
  }, [data]);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("tabla-modelos")?.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="overflow-auto h-96 flex flex-col gap-10" id="tabla-modelos">
      <Label className="flex w-full max-w-96 gap-0 self-end">
        <Input
          type="text"
          placeholder={
            data?.campo_medicion
              ? data.campo_medicion
              : "Seleccione una categoria para buscar productos"
          }
          className="placeholder:font-prosto-one placeholder:text-base border-2 border-r-0 rounded-r-none border-border-gray focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => {
            console.log(search);
            setSearch(e.target.value);
          }}
          // onKeyDown={(e) => handleClick(e)}
        />
        <Button
          type="submit"
          className="bg-bg-search  rounded-l-none border-2 border-l-0 border-border-gray text-azul hover:bg-azul hover:text-blanco"
          // onClick={() => alert("Buscando")}
        >
          <Search size={24} strokeWidth={3} />
        </Button>
      </Label>
      {search === "" ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Medida</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Origen</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Código Interno</TableHead>
              <TableHead>Precio</TableHead>
              {/* <TableHead>Stock</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.productos?.map((item) => (
              <TableRow className="cursor-pointer" key={item.id_producto}>
                {/* <TableCell>
            <div className="flex justify-center">
              <img
                src={item.imagenes[0]}
                alt="Imagen del modelo de auto"
                className="w-10 bg-red-500"
              />
            </div>
          </TableCell> */}
                <TableCell>{item.medida}</TableCell>
                <TableCell>{item.descripcion}</TableCell>
                <TableCell>{item.origen}</TableCell>
                <TableCell>{item.marca_fabricante}</TableCell>
                <TableCell>
                  <Link
                    to={`/product/${item.id_producto}`}
                    className="underline"
                  >
                    {item.codigo_interno}
                  </Link>
                </TableCell>
                <TableCell>{item.precio_venta}</TableCell>
                <TableCell>{item.stock}</TableCell>
              </TableRow>
            ))}

            {data?.productos?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  No hay modelos para mostrar
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medida</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Origen</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Código Interno</TableHead>
                <TableHead>Precio</TableHead>
                {/* <TableHead>Stock</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterData?.map((item: any) => (
                <TableRow key={item?.id_producto}>
                  <TableCell>{item.medida}</TableCell>
                  <TableCell>{item.descripcion}</TableCell>
                  <TableCell>{item.origen}</TableCell>
                  <TableCell>{item.marca_fabricante}</TableCell>
                  <TableCell>
                    <Link
                      to={`/product/${item.id_producto}`}
                      className="underline"
                    >
                      {item.codigo_interno}
                    </Link>
                  </TableCell>
                  <TableCell>{item.precio_venta}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {/* {filterData.length === 0 && <span>Filtrando</span>} */}
    </div>
  );
};
