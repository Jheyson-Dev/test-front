import { Link, NavLink, useNavigate } from "react-router-dom";
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
import { useTiendaProductoAll } from "../../hooks/TiendaProducto/useTiendaProductoAll";
import { clearLine } from "readline";
import { Loading } from "../../components/Loading";

export const TiendaProductoList = () => {
  const navigate = useNavigate();

  const { data, refetch } = useTiendaProductoAll();
  console.log(data);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const deleMutation = useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/tienda_productos/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Asignacion eliminada", {
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
  // Definicion de Columnas

  const columns: ColumnDef[] = [
    {
      accessorKey: "id_tienda_producto",
      header: "ID",
    },
    {
      accessorKey: "id_tienda",
      header: "ID Tienda",
      cell: ({ row }) => {
        const options = row.original;
        return (
          <NavLink
            to={`/admin/store/${options.id_tienda}`}
            className="underline"
          >
            {options.id_tienda}
          </NavLink>
        );
      },
    },
    {
      accessorKey: "id_producto",
      header: "ID Producto",
      cell: ({ row }) => {
        const options = row.original;
        return (
          <NavLink
            to={`/admin/product/${options.id_producto}`}
            className="underline"
          >
            {options.id_producto}
          </NavLink>
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
                navigate(`/admin/store-product/${options.id_tienda_producto}`);
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
                    ¿Esta seguro de eliminar la asignacion?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta accion no se puede deshacer
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(options.id_tienda_producto)}
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
      <p className="text-2xl font-poppins font-semibold">
        Lista Productos y Tiendas
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

        <Button
          variant={"default"}
          onClick={() => navigate("/admin/store-product/create")}
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
