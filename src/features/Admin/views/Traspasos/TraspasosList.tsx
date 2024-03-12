import { Link, useNavigate } from "react-router-dom";
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
import { useTraspasosAll } from "../../hooks/Traspasos/useTraspasosAll";

export const TraspasosList = () => {
  const navigate = useNavigate();

  const { data, refetch } = useTraspasosAll();
  console.log(data);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const deleMutation = useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/reemplazos/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Reemplazo eliminado", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      refetch();
    },
  });

  const handleDelete = (id) => {
    deleMutation.mutate(id);
  };

  // Definicion de COlumnas
  const columns: ColumnDef[] = [
    {
      accessorKey: "id_traspaso",
      header: "ID",
    },
    {
      accessorKey: "id_producto",
      header: "ID producto",
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
      accessorKey: "id_tienda_origen",
      header: "ID Tienda Origen",
    },
    {
      accessorKey: "id_tienda_destino",
      header: "ID Tienda Destino",
    },
    {
      accessorKey: "fecha_hora",
      header: "Fecha y hora",
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
      <p className="text-2xl font-poppins font-semibold">Lista de Traspasos</p>
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

        <Button
          variant={"default"}
          onClick={() => navigate("/admin/transfer/create")}
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
