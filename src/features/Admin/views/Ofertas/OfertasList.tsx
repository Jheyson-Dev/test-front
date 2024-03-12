import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Hooks
import { useEffect, useState } from "react";

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

import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/axiosConfig";
import { toast } from "sonner";
import { useOfertasAll } from "../../hooks/Ofertas/useOfertasAll";
import { Loading } from "../../components/Loading";

export const OfertasList = () => {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useOfertasAll();
  console.log(data);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Eliminar Usuario

  const deleteMutatio = useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/ofertas/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Oferta eliminada correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      refetch();
    },
  });

  const handleDeleteUser = (id) => {
    deleteMutatio.mutate(id);
  };

  // Definicion de las columnas
  const columns: ColumnDef[] = [
    {
      accessorKey: "id_oferta",
      header: "ID",
    },
    {
      accessorKey: "codigo_interno",
      header: "Codigo Interno",
      cell: ({ row }) => {
        const options = row.original;
        return (
          <NavLink
            to={`/admin/product/${options.id_producto}`}
            className="underline"
          >
            {options.codigo_interno}
          </NavLink>
        );
      },
    },
    {
      accessorKey: "descripcion_oferta",
      header: "Descripcion",
    },
    {
      accessorKey: "priorizacion",
      header: "Priorizacion",
      cell: ({ row }) => {
        const options = row.original;
        return (
          <div className="flex items-center gap-2">
            {options.priorizacion === "SI" ? (
              <span className="bg-green-500 text-white py-1 w-10 flex justify-center rounded-lg">
                Si
              </span>
            ) : (
              <span className="bg-red-500 text-white py-1 w-10 flex justify-center rounded-lg">
                No
              </span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "descuento",
      header: "Precio oferta",
    },
    {
      id: "actions",
      header: "Opciones",
      cell: ({ row }) => {
        const options = row.original;
        return (
          <div className="flex gap-5 items-center">
            <Button
              onClick={() => {
                navigate(`/admin/offer/${options.id_oferta}`);
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
                    onClick={() => handleDeleteUser(options.id_oferta)}
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
      {deleteMutatio.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Lista de Ofertas</p>
      <div className="flex items-center py-6 justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Ingrese el nombre del usuario a buscar..."
            className="w-96"
            disabled
            // value={
            //   (table.getColumn("username")?.getFilterValue() as string) ?? ""
            // }
            // onChange={(e) => {
            //   table.getColumn("username")?.setFilterValue(e.target.value);
            // }}
          />
        </div>
        <Button
          variant={"default"}
          onClick={() => navigate("/admin/offer/create")}
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
