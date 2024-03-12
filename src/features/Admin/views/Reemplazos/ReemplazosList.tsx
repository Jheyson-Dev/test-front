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
import { Loading } from "../../components/Loading";

interface Reemplazo {
  id_reemplazo: number;
  id_producto: number;
  producto_reeemplazo: number;
  variacion: number;
}

export const ReemplazosList = () => {
  const navigate = useNavigate();

  const { data, refetch } = useReemplazoAll();

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

  // Definnicion de las columnas

  const columns: ColumnDef<Reemplazo>[] = [
    {
      accessorKey: "id_reemplazo",
      header: "ID",
    },
    {
      accessorKey: "id_producto",
      header: "Codigo Producto",
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
      accessorKey: "producto_reemplazo",
      header: "Codigo Reemplazo",
      cell: ({ row }) => {
        const options = row.original;
        return (
          <Link
            to={`/admin/product/${options.producto_reemplazo}`}
            className="underline"
          >
            <p>{options.producto_reemplazo}</p>
          </Link>
        );
      },
    },
    {
      accessorKey: "variacion",
      header: "Variacion",
      cell: ({ row }) => {
        const options = row.original;
        return (
          <div className="">
            <p>{options.variacion}%</p>
          </div>
        );
      },
    },
    {
      accessorKey: "notas",
      header: "Notas",
    },
    {
      accessorKey: "acciones",
      header: "Acciones",
      cell: ({ row }) => {
        const options = row.original;
        return (
          <div className="flex gap-5">
            <Button
              variant={"default"}
              onClick={() => {
                navigate(`/admin/replace/${options.id_reemplazo}`);
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
                    ¿Esta seguro de eliminar el reemplazo?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta accion no se puede deshacer
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(options.id_reemplazo)}
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
      {deleMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Lista de Reemplazos</p>
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
          onClick={() => navigate("/admin/replace/create")}
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
