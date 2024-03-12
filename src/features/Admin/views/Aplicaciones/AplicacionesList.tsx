import { Link, useNavigate } from "react-router-dom";

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
import { useAplicationAll } from "../../hooks/Aplicacion/useAplicationAll";
import { Loading } from "../../components/Loading";

interface Aplicacion {
  id_aplicacion: number;
  id_producto: number;
  id_modelo_auto: number;
}

export const AplicacionesList = () => {
  const navigate = useNavigate();

  const { data, refetch } = useAplicationAll();
  console.log(data);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/aplicaciones/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Aplicacion eliminada", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      refetch();
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  // Definicion de Columnas
  const columns: ColumnDef<Aplicacion>[] = [
    {
      accessorKey: "id_aplicacion",
      header: "ID",
    },
    {
      accessorKey: "id_producto",
      header: "Codigo producto",
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
      accessorKey: "id_modelo_auto",
      header: "Modelo auto",
      cell: ({ row }) => {
        const options = row.original;
        return (
          <Link
            to={`/admin/car-model/${options.id_modelo_auto}`}
            className="underline"
          >
            {options.id_modelo_auto}
          </Link>
        );
      },
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
                navigate(`/admin/application/${options.id_aplicacion}`);
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
                    ¿Esta seguro de eliminar el usuario?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta accion no se puede deshacer
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(options.id_aplicacion)}
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
      <p className="text-2xl font-poppins font-semibold">
        Lista de Aplicaciones
      </p>
      <div className="flex items-center py-6 justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="ingrese el codigo del producto"
            className="w-96"
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

        <Button onClick={() => navigate("/admin/application/create")}>
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
