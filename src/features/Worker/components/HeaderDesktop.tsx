import { CarTaxiFront, LogOutIcon, Phone, ShoppingCart } from "lucide-react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/cartContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const HeaderDesktop = () => {
  const { cartItems } = useCart();
  const [cambio, setCambio] = useState({});
  const navigate = useNavigate();

  const tipoCambio = async () => {
    const { data } = await axios.get(
      "https://api.apis.net.pe/v1/tipo-cambio-sunat"
    );
    setCambio(data);
    return data;
  };
  // useEffect(() => {
  //   tipoCambio();
  // }, []);

  return (
    <header className="bg-azul h-16 hidden lg:block lg:px-16 sticky top-0 shadow-lg">
      <div className="container h-full flex justify-between items-center">
        <nav className="flex gap-8 h-full text-xl">
          <div className="font-prosto-one  text-blanco  self-center">
            <NavLink
              to="/worker"
              end
              className={({ isActive }) =>
                isActive ? " border-border-gray border-b-4" : ""
              }
            >
              Buscador
            </NavLink>
          </div>
          <div className="font-prosto-one text-blanco  self-center">
            <NavLink
              to="/worker/search-code"
              className={({ isActive }) =>
                isActive ? " border-border-gray border-b-4" : ""
              }
            >
              Código Referencia
            </NavLink>
          </div>
          <div className="font-prosto-one text-blanco  self-center">
            <NavLink
              to="/worker/search-model"
              className={({ isActive }) =>
                isActive ? " border-border-gray border-b-4" : ""
              }
            >
              Modelo
            </NavLink>
          </div>
          <div className="font-prosto-one text-blanco  self-center">
            <NavLink
              to="/worker/search-medida"
              className={({ isActive }) =>
                isActive ? " border-border-gray border-b-4" : ""
              }
            >
              Medida
            </NavLink>
          </div>
          <div className="font-prosto-one text-blanco  self-center">
            <NavLink
              to="/worker/cart"
              className={({ isActive }) =>
                isActive
                  ? " border-border-gray border-b-4 flex gap-2"
                  : "flex gap-2"
              }
            >
              <ShoppingCart size={24} className="mb-1" />
            </NavLink>
          </div>
        </nav>
        <div
          className="text-blanco font-prosto-one text-base flex gap-2 items-center cursor-pointer bg-red-500 px-2 py-2 rounded-full"
          onClick={() => {
            localStorage.removeItem("rol");
            localStorage.removeItem("usuario");
            toast.success("Sesión cerrada");
            navigate("/");
          }}
        >
          <LogOutIcon size={24} />
          {/* <Phone size={28} /> */}
          {/* Compra: S/0.00 Venta: S/.0.00 */}
        </div>
      </div>
    </header>
  );
};
