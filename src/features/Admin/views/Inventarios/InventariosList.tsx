import { Link, useNavigate } from "react-router-dom";
import { useReemplazoAll } from "../../hooks/Reemplazo/useReemplazoAll";
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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/axiosConfig";
import { toast } from "sonner";
import { useInventarioAll } from "../../hooks/Inventario/useInventarioAll";

export const InventariosList = () => {
  const { data, refetch } = useInventarioAll();
  console.log(data);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Definicion de las columnas
  const columns: ColumnDef[] = [
    {
      accessorKey: "id_reduccion_inventario",
      header: "ID",
    },
    {
      accessorKey: "id_producto",
      header: "ID Producto",
      cell: ({ row }) => {
        const options = row.original;
        return (
          <Link
            to={`/admin/product/${options.id_producto}`}
            className="underline"
          >
            <p>{options.id_producto}</p>
          </Link>
        );
      },
    },
    {
      accessorKey: "id_tienda",
      header: "ID tienda",
      cell: ({ row }) => {
        const options = row.original;
        return (
          <Link to={`/admin/store/${options.id_tienda}`} className="underline">
            <p>{options.id_tienda}</p>
          </Link>
        );
      },
    },
    {
      accessorKey: "cantidad",
      header: "Cantidad",
    },
    {
      accessorKey: "usuario",
      header: "Usuario",
    },
    {
      accessorKey: "fecha_hora",
      header: "Fecha",
      cell: ({ row }) => {
        const fecha = new Date(row.original.fecha_hora);
        const formattedDate =
          fecha.getFullYear() +
          "-" +
          String(fecha.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(fecha.getDate()).padStart(2, "0") +
          " " +
          String(fecha.getHours()).padStart(2, "0") +
          ":" +
          String(fecha.getMinutes()).padStart(2, "0");
        return formattedDate;
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
      <p className="text-2xl font-poppins font-semibold">
        Reduccion de Inventarios
      </p>
      <div className="flex items-center py-6 justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Ingrese el codigo interno del producto"
            className="w-96"
            disabled
            // value={
            //   (table
            //     .getColumn("codigo_interno_original")
            //     ?.getFilterValue() as string) ?? ""
            // }
            // onChange={(e) => {
            //   table
            //     .getColumn("codigo_interno_original")
            //     ?.setFilterValue(e.target.value);
            // }}
          />
        </div>

        {/* <Button
          variant={"default"}
          onClick={() => navigate("/admin/replace/create")}
        >
          Agregar
        </Button> */}
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
