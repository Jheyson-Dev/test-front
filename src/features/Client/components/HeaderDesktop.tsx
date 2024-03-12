import { Phone, User2, User2Icon, UserCircle, UserIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export const HeaderDesktop = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-azul h-16 hidden lg:block lg:px-16 sticky top-0 shadow-lg">
      <div className="container h-full flex justify-between items-center">
        <nav className="flex gap-8 h-full text-xl">
          <div className="font-prosto-one  text-blanco  self-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? " border-border-gray border-b-4" : ""
              }
            >
              Buscador
            </NavLink>
          </div>
          <div className="font-prosto-one text-blanco  self-center">
            <NavLink
              to="/search-code"
              className={({ isActive }) =>
                isActive ? " border-border-gray border-b-4" : ""
              }
            >
              Código Referencia
            </NavLink>
          </div>
          <div className="font-prosto-one text-blanco  self-center">
            <NavLink
              to="/search-model"
              className={({ isActive }) =>
                isActive ? " border-border-gray border-b-4" : ""
              }
            >
              Modelo
            </NavLink>
          </div>
          <div className="font-prosto-one text-blanco  self-center">
            <NavLink
              to="/search-medida"
              className={({ isActive }) =>
                isActive ? " border-border-gray border-b-4" : ""
              }
            >
              Medida
            </NavLink>
          </div>
        </nav>
        <div className="flex gap-8">
          <div className="text-blanco font-prosto-one text-base flex gap-2 items-center">
            <Phone size={28} />
            Ventas Jesenka 994113757
          </div>
          <div
            className="bg-white cursor-pointer border-2 border-blanco p-2 rounded-full"
            onClick={() => navigate("/login")}
          >
            <UserIcon />
          </div>
        </div>
      </div>
    </header>
  );
};
