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

import { useNavigate } from "react-router-dom";
import { useUserAll } from "../../hooks/useUserAll";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/axiosConfig";
import { toast } from "sonner";
import { Loading } from "../../components/Loading";
// import { createUser } from "../../services/actions";

// Interfaces
interface User {
  id_usuario: number;
  correo: string;
  username: string;
  password: string;
  rol: string;
  estado: string;
}

export const User = () => {
  const navigate = useNavigate();

  const { data, refetch } = useUserAll();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Eliminar Usuario

  const deleteMutatio = useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/usuarios/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Usuario eliminado correctamente", {
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

  // Definicion de columnas
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id_usuario",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer font-poppins"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        );
      },
    },
    {
      accessorKey: "username",
      header: "Usuario",
    },
    {
      accessorKey: "rol",
      header: "Rol",
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => {
        return (
          <span className="text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-md">
            Activo
          </span>
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
              onClick={() => {
                navigate(`/admin/user/${options.id_usuario}`);
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
                    onClick={() => handleDeleteUser(options.id_usuario)}
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

      <p className="text-2xl font-poppins font-semibold">Lista de Usuarios</p>
      <div className="flex items-center py-6 justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Ingrese el nombre del usuario a buscar..."
            className="w-96"
            value={
              (table.getColumn("username")?.getFilterValue() as string) ?? ""
            }
            onChange={(e) => {
              table.getColumn("username")?.setFilterValue(e.target.value);
            }}
          />
        </div>
        <Button
          variant={"default"}
          onClick={() => navigate("/admin/user/create")}
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
