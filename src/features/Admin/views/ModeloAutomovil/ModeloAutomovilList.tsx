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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModeloAutoAll } from "../../hooks/ModeloAuto/useModeloAutoAll";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/axiosConfig";
import { toast } from "sonner";
import { access } from "fs";
import { Loading } from "../../components/Loading";

export const ModeloAutomovilList = () => {
  const { data, refetch } = useModeloAutoAll();
  const navigate = useNavigate();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/modelo_autos/${id}`);
      return response.data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Aplicacion eliminada con exito", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
    },
  });

  // Definicion de Columnas
  const columns: ColumnDef[] = [
    {
      accessorKey: "id_modelo_auto",
      header: "ID",
    },
    {
      accessorKey: "id_marca_auto",
      header: "Marca",
    },
    {
      accessorKey: "anio_inicio_termino",
      header: "Año I - Año T",
    },
    {
      accessorKey: "motor",
      header: "Motor",
    },

    {
      accessorKey: "img_url",
      header: "Imagen",
      cell: ({ row }) => {
        const options = row.original;
        return (
          <div>
            <img
              src={options.img_url}
              alt=""
              className="w-24 aspect-video object-contain flex justify-center"
            />
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Opciones",
      cell: ({ row }) => {
        const options = row.original;
        return (
          <div className="flex gap-5 items-center justify-center">
            <Button
              variant={"default"}
              onClick={() => {
                navigate(`/admin/car-model/${options.id_modelo_auto}`);
              }}
            >
              Editar
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={"destructive"}>Eliminar</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(options.id_modelo_auto)}
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

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };
  return (
    <div>
      {deleteMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Modelo Automovil</p>

      {/* Buscador y boton de crear */}
      <div className="flex items-center py-6 justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Ingrese el modelo de auto a buscar"
            className="w-96"
            disabled
            // value={
            //   (table.getColumn("nombre")?.getFilterValue() as string) ?? ""
            // }
            // onChange={(e) => {
            //   table.getColumn("nombre")?.setFilterValue(e.target.value);
            // }}
          />
        </div>

        <Button
          variant={"default"}
          onClick={() => navigate("/admin/car-model/create")}
        >
          Agregar
        </Button>
      </div>
      {/*  */}

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
