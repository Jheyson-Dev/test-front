import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Hooks
import { useState } from "react";

// Icons
import { ArrowUpDown } from "lucide-react";

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
import { useIngresosAll } from "../../hooks/Ingresos/useIngresosAll";
import api from "@/utils/axiosConfig";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

interface Ingresos {
  id_ingreso: number;
  cantidad: number;
  fecha_hora: string;
  id_producto: number;
}
export const IngresosList = () => {
  const navigate = useNavigate();

  const { data, refetch } = useIngresosAll();
  console.log(data);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Eliminar Ingresos
  const deleteMutatio = useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/ingresos/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Ingreso eliminado correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
    },
  });

  const handleDeleteUser = (id) => {
    deleteMutatio.mutate(id);
  };

  // Definicion de Columnas

  const columns: ColumnDef<Ingresos>[] = [
    {
      accessorKey: "id_ingreso",
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
            {options.id_producto}
          </Link>
        );
      },
    },
    {
      accessorKey: "id_tienda",
      header: "Tienda",
      cell: ({ row }) => {
        const options = row.original;
        return (
          <Link to={`/admin/store/${options.id_tienda}`} className="underline">
            {options.id_tienda}
          </Link>
        );
      },
    },
    {
      accessorKey: "cantidad",
      header: "Cantidad",
    },
    {
      accessorKey: "fecha_hora",
      header: "Fecha y Hora",
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
      <p className="text-2xl font-poppins font-semibold">Lista de Ingresos</p>
      <div className="flex items-center py-6 justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Ingrese el id a buscar..."
            className="w-96"
            disabled
            value={
              (table.getColumn("id_producto")?.getFilterValue() as string) ?? ""
            }
            onChange={(e) => {
              table.getColumn("id_producto")?.setFilterValue(e.target.value);
            }}
          />
        </div>
        <Button
          variant={"default"}
          onClick={() => navigate("/admin/ingresos/create")}
        >
          Agregar
        </Button>
      </div>
      {/* Tabla de Usuarios */}
      <div className="">
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
