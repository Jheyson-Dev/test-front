import { Phone } from "lucide-react";
import { NavLink } from "react-router-dom";

export const HeaderDesktop = () => {
  return (
    <header className="bg-azul h-16 hidden lg:block lg:px-16 sticky top-0 shadow-lg">
      <div className="container h-full flex justify-between items-center">
        <nav className="flex gap-8 h-full text-xl">
          <div className="font-prosto-one  text-blanco  self-center">
            <NavLink
              to="/worker"
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
        </nav>
        <div className="text-blanco font-prosto-one text-base flex gap-2 items-center">
          <Phone size={28} />
          Ventas Jesenka 994113757
        </div>
      </div>
    </header>
  );
};
