import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Hooks
import { useState } from "react";

// Icons

// React Query

// React Table
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

// Shadcn
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Link, useNavigate } from "react-router-dom";
import { useImagesAll } from "../../hooks/ImagenesProducto/useImagesAll";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/axiosConfig";
import { toast } from "sonner";
import { Loading } from "../../components/Loading";

interface Imagenes {
  id_img_producto: number;
  id_producto: number;
  img_url: string;
}
export const ImagenesProductoList = () => {
  const navigate = useNavigate();
  const { data, refetch } = useImagesAll();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Elimnar Imagen
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/img_productos/${id}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Imagen de Producto eliminada correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      refetch();
    },
  });

  const handleDeleteImage = (id) => {
    deleteMutation.mutate(id);
  };

  // Definicion de columnas
  const columns: ColumnDef<Imagenes>[] = [
    {
      accessorKey: "id_img_producto",
      header: "ID",
    },
    {
      accessorKey: "id_producto",
      header: "Codigo Interno",
      cell: ({ row }) => {
        const options = row.original;
        return (
          <Link
            to={`/admin/product/${options.id_producto}`}
            className="underline"
          >
            {options.id_producto}
          </Link>
        );
      },
    },
    {
      accessorKey: "img_url",
      header: "Imagen",
      cell: ({ row }) => {
        const options = row.original;
        return (
          <img
            src={options.img_url}
            alt="Imagen de Producto"
            className="w-20 aspect-video object-contain flex justify-center"
          />
        );
      },
    },
    {
      id: "actions",
      header: "Opciones",
      cell: ({ row }) => {
        const options = row.original;
        return (
          <div className="flex gap-5 items-center">
            <Button
              variant={"default"}
              onClick={() => {
                navigate(`/admin/image-product/${options.id_img_producto}`);
              }}
            >
              Ver
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={"destructive"}>Eliminar</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Esta seguro de eliminar la imagen del producto?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta accion no se puede deshacer
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteImage(options.id_img_producto)}
                  >
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });
  return (
    <div className="">
      {deleteMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Lista de Imagenes</p>
      <div className="flex items-center py-6 justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Ingrese el codigo interno del producto"
            className=" w-96"
            disabled
            // value={
            //   (table.getColumn("codigo_interno")?.getFilterValue() as string) ??
            //   ""
            // }
            // onChange={(e) => {
            //   table.getColumn("codigo_interno")?.setFilterValue(e.target.value);
            // }}
          />
        </div>

        <Button
          variant={"default"}
          onClick={() => navigate("/admin/image-product/create")}
        >
          Agregar
        </Button>
      </div>
      {/* Tabla */}
      <div>
        <Table>
          {/* // Hencabeazdos */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {/* // Cuerpo de la tabla */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
