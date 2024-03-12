import { useCategoriaAll } from "../../hooks/Categoria/useCategoriaAll";

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

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/axiosConfig";
import { toast } from "sonner";
import { Loading } from "../../components/Loading";

export const CategoriaList = () => {
  const { data, refetch } = useCategoriaAll();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const navigate = useNavigate();

  // Definicion de Columnas
  const columns: ColumnDef[] = [
    {
      accessorKey: "id_categoria",
      header: "ID",
    },
    {
      accessorKey: "nombre_producto",
      header: "Nombre",
    },
    {
      accessorKey: "campo_medicion",
      header: "Campo Medicion",
    },
    {
      accessorKey: "tipo",
      header: "Tipo",
    },
    {
      id: "imagen",
      header: "Imagen",
      cell: ({ row }) => {
        const option = row.original;
        return (
          <img
            src={option.url_campo_medicion}
            alt=""
            className="w-20 aspect-video object-contain"
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
                navigate(`/admin/category/${options.id_categoria}`);
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
                    ¿Esta seguro de eliminar la categoria?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta accion no se puede deshacer
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteCategory(options.id_categoria)}
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

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/categorias/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Categoría eliminada correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      refetch();
    },
  });

  const handleDeleteCategory = (id) => {
    deleteMutation.mutate(id);
  };
  return (
    <div className="">
      {deleteMutation.isPending && <Loading />}

      <p className="text-2xl font-poppins font-semibold">Lista de Categorias</p>

      {/* Buscador y boton de crear */}
      <div className="flex items-center py-6 justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Ingrese el nombre de la categoria a buscar..."
            className="w-96"
            value={
              (table
                .getColumn("nombre_producto")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(e) => {
              table
                .getColumn("nombre_producto")
                ?.setFilterValue(e.target.value);
            }}
          />
        </div>

        <Button
          variant={"default"}
          onClick={() => navigate("/admin/category/create")}
        >
          Agregar
        </Button>
      </div>
      <div>
        <Table>
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
