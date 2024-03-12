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
import { UseProductAll } from "../../hooks/Product/UseProductAll";
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
import { ArrowUpDown, ImportIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/axiosConfig";
import { toast } from "sonner";
import { Loading } from "../../components/Loading";

// Interface
export interface Product {
  nombre: string;
  id_producto: number;
  codigo_OEM: string;
  codigo_interno: string;
  codigo_fabricante: string;
  descripcion: string;
  multiplos: string;
  precio: number;
  id_categoria: number;
  id_medida: number;
  id_modelo_auto: number;
  id_pais_origen: number;
  id_marca_fabricante: number;
}

export const ProductList = () => {
  const { data, refetch } = UseProductAll();
  const navigate = useNavigate();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Definicion de Columnas
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "id_producto",
      header: "ID",
      size: 50,
    },
    {
      accessorKey: "nombre_producto",
      header: ({ column }) => {
        return (
          <div
            className={`flex items-center cursor-pointer justify-center font-poppins w-[${column.getSize()}px]`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nombre
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        );
      },
    },

    {
      accessorKey: "codigo_OEM",
      header: "Codigo OEM",
    },
    {
      accessorKey: "codigo_interno",
      header: "Codigo Interno",
    },
    {
      accessorKey: "codigo_fabricante",
      header: "Codigo Fabricante",
    },
    {
      accessorKey: "descripcion",
      header: "Descripcion",
      cell: ({ row }) => {
        const options = row.original;
        return (
          <div className="flex justify-center h-10 overflow-hidden overflow-ellipsis">
            <p className="text-sm">{options.descripcion}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "multiplos",
      header: "Multiplos",
    },
    {
      accessorKey: "precio_venta",
      header: "Precio",
    },
    {
      accessorKey: "total_stock",
      header: "Stock",
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
                navigate(`/admin/product/${options.id_producto}`);
              }}
            >
              Ver
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-red-600 text-white rounded-md px-3 py-2 flex gap-2 items-center cursor-pointer">
                  Eliminar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Esta seguro de eliminar el producto??
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta accion no se puede deshacer
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteProduct(options.id_producto)}
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
      const response = await api.delete(`/productos/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Producto eliminado correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      refetch();
    },
  });

  const handleDeleteProduct = (id) => {
    deleteMutation.mutate(id);
  };
  return (
    <div className="">
      {deleteMutation.isPending && <Loading />}
      <p className="text-2xl font-poppins font-semibold">Lista de Productos</p>
      <div className="flex items-center py-6 justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Ingrese la descripcion a buscar..."
            className="w-96"
            value={
              (table.getColumn("descripcion")?.getFilterValue() as string) ?? ""
            }
            onChange={(e) => {
              table.getColumn("descripcion")?.setFilterValue(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={"default"}
            onClick={() => navigate("/admin/product/create")}
          >
            Agregar
          </Button>
          <Button
            variant={"default"}
            className="flex gap-4 bg-verde-whatsapp"
            onClick={() => navigate("/admin/product/import")}
          >
            <ImportIcon className="h-5 w-5" />
            Importar Excel
          </Button>
        </div>
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
                  <TableRow key={row.id} className="">
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
                  className="h-20 text-center"
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
