import { useState } from "react";
import logo from "../../../../assets/logo.svg";

// Icons
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const changeNav = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="bg-blanco shadow-lg">
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
                  <Link to={"/"} className="mb-2">
                    Buscador
                  </Link>
                </div>
                <div className="w-full text-center">
                  <a href="#" className="mb-2">
                    Codigo Referencia
                  </a>
                </div>
                <div className="w-full text-center">
                  <a href="#" className="mb-2">
                    Modelo
                  </a>
                </div>
                <div className="w-full text-center">
                  <a href="#" className="mb-2">
                    Medida
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
