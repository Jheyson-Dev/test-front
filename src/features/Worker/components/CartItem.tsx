import { Button } from "@/components/ui/button";
import { Minus, PlusIcon } from "lucide-react";
// Shadcn
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../contexts/cartContext";
import { useNavigate } from "react-router-dom";

interface CartItemProps {
  item: any; // Reemplaza `any` con el tipo de `item`
  index: number;
}

export const CartItem: React.FC<CartItemProps> = ({ item, index }) => {
  const navigate = useNavigate();
  const {
    addQuantityToItem,
    removeItemFromCart,
    reduceQuantityFromItem,
    reducir,
  } = useCart();
  const [productId, setProductId] = useState(item.id_producto);
  const [storeId, setStoreId] = useState(null);
  const [usuario, setUsuario] = useState(localStorage.getItem("usuario") || "");
  console.log(item);

  return (
    <div
      className="w-full rounded-lg p-4 shadow-lg border-[2px] border-admin-gray"
      key={index}
    >
      <div className="grid grid-cols-10 items-center place-items-center">
        <img
          src={
            item?.imagenes[0]?.img_url ||
            "https://catedralsalamanca.org/wp-content/uploads/2014/06/no_hay_imagen.jpg"
          }
          alt=""
          className="w-16 h-16 object-cover rounded-md border-[1px] border-admin-gray"
        />

        <div className="flex flex-col gap-2  ">
          <span className="font-semibold text-base">
            {item?.nombre_producto}
          </span>
          <span
            className="font-semibold text-xs underline cursor-pointer"
            onClick={() => navigate(`/worker/product/${item.id_producto}`)}
          >
            {item?.codigo_interno}
          </span>
        </div>
        <div className="flex items-center justify-center">
          <Button
            // className=" w-6 h-6 bg-azul rounded-md flex items-center justify-center cursor-pointer"
            size={"icon"}
            onClick={() => reduceQuantityFromItem(productId)}
          >
            <Minus size={20} color="#ffffff" />
          </Button>
          <div
            className="font-semibold text-xl w-10 flex items-center justify-center shadow-xl rounded-md"
            // onClick={}
          >
            {item?.quantity}
          </div>
          <Button size={"icon"} onClick={() => addQuantityToItem(productId)}>
            <PlusIcon size={20} />
          </Button>
        </div>
        <div className=" flex flex-col items-center font-semibold ">
          <span className="text-xs font-semibold text-center">
            Precio Venta
          </span>
          S/ {item?.precio_venta}
        </div>
        <div className=" flex flex-col items-center font-semibold ">
          <span className="text-xs font-semibold text-center">
            Precio Minimo
          </span>
          S/ {item?.precio_minimo}
        </div>
        <div className="grid gap-.5 font-semibold text-sm col-span-2 w-5/6">
          Tienda - Stock
          <Select onValueChange={(value) => setStoreId(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Tienda" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {item?.tiendas?.map((item, index) => (
                  <SelectItem value={item.id_tienda} key={index}>
                    {item.razon_social} - {item.stock}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col items-center">
          <span className="font-semibold text-xs">Stock Total</span>
          <span className="font-semibold">{item?.total_stock}</span>
        </div>

        <div className="flex gap-2 col-span-2">
          <Button
            variant={"default"}
            onClick={() => {
              if (storeId === null) {
                toast.error("Seleccione una tienda", {
                  style: {
                    backgroundColor: "#F87171",
                    color: "#fff",
                  },
                  duration: 1000,
                });
                return;
              }

              reducir({
                id_producto: productId,
                id_tienda: storeId,
                cantidad: item?.quantity,
                usuario: usuario,
              });
            }}
          >
            Reducir
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => removeItemFromCart(item.id_producto)}
          >
            Eliminar
          </Button>
        </div>
      </div>
      {/* <Separator className="my-2 h-1" /> */}
    </div>
  );
};
