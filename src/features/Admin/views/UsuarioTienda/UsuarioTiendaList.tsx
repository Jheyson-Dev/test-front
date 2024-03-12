import { Link, useNavigate } from "react-router-dom";
import { useTiendaUsuarioAll } from "../../hooks/TiendaUsuario/useTiendaUsuarioAll";
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
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/axiosConfig";
import { toast } from "sonner";
import { Loading } from "../../components/Loading";

export const UsuarioTiendaList = () => {
  const navigate = useNavigate();

  const { data, refetch } = useTiendaUsuarioAll();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Eliminar Tienda Usuario

  const deleteMutatio = useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/tienda_usuarios/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Asignacion eliminada correctamente", {
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

  // Definicion de Columnas

  const columns: ColumnDef[] = [
    {
      accessorKey: "id_tienda_usuario",
      header: "ID",
    },
    {
      accessorKey: "id_usuario",
      header: "Usuario",
      cell: ({ row }) => {
        const options = row.original;
        return (
          <div className="flex items-center gap-2 underline">
            <Link to={`/admin/user/${options.id_usuario}`}>
              {options.id_usuario}
            </Link>
          </div>
        );
      },
    },
    {
      accessorKey: "id_tienda",
      header: "Tienda",
      cell: ({ row }) => {
        const options = row.original;
        return (
          <div className="flex items-center gap-2 underline">
            <Link to={`/admin/store/${options.id_tienda}`}>
              {options.id_tienda}
            </Link>
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
          <div className="flex gap-5 items-center">
            <Button
              onClick={() => {
                navigate(`/admin/user-store/${options.id_tienda_usuario}`);
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
                    ¿Esta seguro de eliminar la asignación?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta accion no se puede deshacer
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteUser(options.id_tienda_usuario)}
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
      <p className="text-2xl font-poppins font-semibold">
        Lista de Asignaciones
      </p>
      <div className="flex items-center py-6 justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="..."
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
          onClick={() => navigate("/admin/user-store/create")}
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
