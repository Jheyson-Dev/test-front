import { Header } from "../components/Header";
// Imagenes
import logo from "../../../assets/logo.svg";
import producto from "../../../assets/product.png";

// Shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Icons
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeaderDesktop } from "../components/HeaderDesktop";
import { TopButton } from "../components/TopButton";

export const Home = () => {
  // Estados

  const [tabs, setTabs] = useState({
    ofertas: false,
    ingresos: false,
  });

  const handleClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") alert("Buscando");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      <Header />
      <HeaderDesktop />
      <div className="container lg:px-16 ">
        <div className="py-10 px-4 flex flex-col gap-4 md:gap-16">
          {/* Logo e Input Search */}
          <div className="flex flex-col gap-10 md:gap-28 items-center">
            {/* Logo */}
            <div>
              <img src={logo} alt="Deybipart Logo" className="w-64 md:w-96" />
            </div>
            {/* Input Search */}
            <div className="flex w-full items-center justify-center">
              <Input
                type="email"
                placeholder="Buscar..."
                className="placeholder:font-prosto-one placeholder:text-base border-2 border-r-0 rounded-r-none border-border-gray focus-visible:ring-0 focus-visible:ring-offset-0 max-w-[80%]"
                onKeyDown={(e) => handleClick(e)}
              />
              <Button
                type="submit"
                className="bg-bg-search  rounded-l-none border-2 border-l-0 border-border-gray text-azul hover:bg-azul hover:text-blanco"
                onClick={() => alert("Buscando")}
              >
                <Search
                  size={24}
                  // color="#052452"
                  strokeWidth={3}
                />
              </Button>
            </div>
          </div>
          {/* Lista de Productos y banner */}
          <div>
            {/* Banner de Ofertas */}
            <div></div>
            {/* Lista de Productos */}
            <div className="">
              {/* Botones de cambio de secciones */}
              <div className="flex justify-between md:justify-start md:gap-2">
                <Button
                  className={`${
                    tabs.ofertas
                      ? " bg-azul text-blanco font-prosto-one text-base border-2 border-azul hover:bg-azul"
                      : "bg-blanco text-red-text font-prosto-one text-base border-2 border-azul hover:bg-azul hover:text-blanco"
                  }`}
                  onClick={() => setTabs({ ofertas: true, ingresos: false })}
                >
                  OFERTAS
                </Button>
                <Button
                  className={`${
                    tabs.ingresos
                      ? " bg-azul text-blanco font-prosto-one text-base border-2 border-azul hover:bg-azul"
                      : "bg-blanco text-red-text font-prosto-one text-base border-2 border-azul hover:bg-azul hover:text-blanco"
                  }`}
                  onClick={() => setTabs({ ofertas: false, ingresos: true })}
                >
                  INGRESOS
                </Button>
              </div>
              {/* Grilla de productos */}
              <div className="place-items-center font-prosto-one flex flex-wrap gap-2 md:gap-4 justify-center text-azul py-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
                  <Link
                    to={`/product/${index}`}
                    key={index}
                    className={`w-40 lg:w-52 flex flex-col items-center gap-2 py-4 px-2 rounded-lg shadow-lg border-[1px] border-border-gray hover:border-negro  ${
                      tabs.ofertas ? "bg-red-500" : ""
                    }
                  ${tabs.ingresos ? "bg-amarillo" : "bg-blanco"}`}
                  >
                    <p className="text-base text-center leading-none">
                      Nombrecito Producto
                    </p>
                    <p className="text-sm">Marca</p>
                    <div>
                      <img src={producto} alt="Imagen de un producto" />
                    </div>
                    <p>S/. 100.00</p>
                    <Button
                      className="bg-azul text-blanco font-prosto-one  border-2 border-azul w-full hover:bg-azul"
                      onClick={() => alert("Añadir al carrito")}
                    >
                      Ver producto
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <TopButton />
      </div>
    </div>
  );
};
