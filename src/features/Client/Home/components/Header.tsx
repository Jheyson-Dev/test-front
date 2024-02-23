import { useEffect, useState } from "react";
import logo from "../../../../assets/logo.svg";

// Icons
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const changeNav = () => {
    setIsOpen(!isOpen);
  };

  // Cilco de vida del componente
  useEffect(() => {
    // Bloquear el scroll
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      // Habilitar el scroll
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <header className="bg-blanco shadow-l">
      <div className="flex justify-between items-center p-4">
        <div>
          <img src={logo} alt="DeybiPart Logo" className="w-24" />
        </div>
        <div>
          <button onClick={changeNav}>
            <Menu color="#093981" size={36} strokeWidth={3} />
          </button>
          {isOpen && (
            <div className="absolute top-0 left-0 w-full h-full flex flex-col p-4 bg-blanco">
              <div className="flex justify-end">
                <button onClick={changeNav}>
                  <X color="#093981" size={36} strokeWidth={3} />
                </button>
              </div>
              <nav className=" flex flex-col gap-8 items-center justify-center h-full text-negro font-prosto-one text-2xl">
                <div className="w-full text-center">
                  <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                      isActive ? "underline" : "mb-2"
                    }
                  >
                    Buscador
                  </NavLink>
                </div>
                <div className="w-full text-center">
                  <NavLink
                    to={"/search-code"}
                    className={({ isActive }) =>
                      isActive ? "underline" : "mb-2"
                    }
                  >
                    Codigo Referencia
                  </NavLink>
                </div>
                <div className="w-full text-center">
                  <NavLink
                    to={"/search-modelo"}
                    className={({ isActive }) =>
                      isActive ? "underline" : "mb-2"
                    }
                  >
                    Modelo
                  </NavLink>
                </div>
                <div className="w-full text-center">
                  <NavLink
                    to={"/search-medida"}
                    className={({ isActive }) =>
                      isActive ? "underline" : "mb-2"
                    }
                  >
                    Medida
                  </NavLink>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
