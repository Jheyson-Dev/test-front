import { Header } from "@/features/Client/components/Header";
import { HeaderDesktop } from "../components/HeaderDesktop";
import logo from "../../../assets/logo.svg";
import { useCart } from "../contexts/cartContext";
import { useNavigate } from "react-router-dom";

import { CartItem } from "../components/CartItem";

export const Carrito = () => {
  const { cartItems, getTotal } = useCart();

  console.log(cartItems);

  const navigate = useNavigate();

  return (
    <div className="relative">
      <Header />
      <HeaderDesktop />
      <div className="container lg:px-16">
        <div className="py-10 px-4 flex flex-col gap-4 md:gap-16">
          {/* Logo e Input Search */}
          <div className="flex flex-col gap-10 md:gap-28 items-center">
            {/* Logo */}
            <div>
              <img src={logo} alt="Deybipart Logo" className="w-64 md:w-96" />
            </div>
            {/* Input Search */}
            <div className="flex w-full items-center ">
              <div className="flex flex-col gap-2 items-center w-full">
                {cartItems?.map((item, index) => (
                  <CartItem key={index} item={item} />
                ))}
                {getTotal() > 0 ? (
                  <div className="flex items-center justify-end h-16 gap-4">
                    <span className="font-bold text-xl">Total: </span>
                    <span className="font-bold text-xl">
                      S/. {getTotal().toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-end h-16 gap-4">
                    <span className="font-bold text-xl">
                      No hay productos en el carrito
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-end">
          <Button className="" onClick={() => updateProductStock()}>
            Reducir Inventario
          </Button>
        </div> */}
      </div>
    </div>
  );
};
