import { Header } from "../components/Header";
// Imagenes
// import logo from "../../../../assets/logo.svg";

// Hooks
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NavLink, Outlet, Link } from "react-router-dom";
import { HeaderDesktop } from "../components/HeaderDesktop";

export const SearchModel = () => {
  // Estados
  const [selected, setSelected] = useState(false);

  //   Manejador click
  // const handleClick = () => {
  //   setSelected(!selected);
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header />
      <HeaderDesktop />
      <div className="container lg:px-16">
        <div className="py-10 px-4 flex flex-col gap-4 md:gap-16">
          {/* Logo */}
          {/* <div className="flex flex-col gap-10 items-center">
          <div>
            <img src={logo} alt="Deybipart Logo" className="w-64 md:w-96" />
          </div>
        </div> */}
          <div className="flex flex-col gap-4 lg:hidden">
            <p className="text-2xl font-poppins font-semibold text-azul">
              Elija una marca
            </p>
            <div className="grid grid-cols-4 gap-1 text-admin-gray font-semibold">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
                (item) => (
                  <div
                    key={item}
                    className=""
                    onClick={() => setSelected(true)}
                  >
                    <p>
                      Asia (<span>{item}</span>)
                    </p>
                  </div>
                )
              )}
            </div>
            <p className="text-2xl font-poppins font-semibold text-azul">
              Elija un modelo
            </p>
            {selected ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>imagen</TableHead>
                    <TableHead>Modelo</TableHead>
                    <TableHead>Año</TableHead>
                    <TableHead>Productos </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2].map((item) => (
                    <TableRow>
                      <TableCell>
                        <img
                          src="https://b2b.refax.pe:9043/MODELOS/092071.png"
                          alt=""
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Link to={`/search-model/product/${item}`}>
                          ASTRA 2000 C20SEL DOHC
                        </Link>
                      </TableCell>
                      <TableCell>1999-2005</TableCell>
                      <TableCell>({item})</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <span className="text-xl font-poppins font-semibold italic text-red-text text-center mt-10">
                Elija una marca para mostrar los modelos
              </span>
            )}
          </div>
          <div className="hidden lg:block">
            <div className="flex ">
              <div className="w-1/4">
                <div className="flex flex-col h-96 overflow-auto">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                    (item) => (
                      <NavLink
                        to={`/search-model/${item}`}
                        className="flex  items-center gap-1"
                        key={item}
                      >
                        <img
                          src="https://b2b.refax.pe:9043/MARCASDEVEHICULOS/chevrolet.png"
                          alt=""
                          className="w-10"
                        />
                        <span>Asia</span>
                        <span>({item})</span>
                      </NavLink>
                    )
                  )}
                </div>
              </div>
              {/* <span className="w-1/2">
            Elija una marca para mostrar los modelos
          </span> */}
              <div className=" w-3/4 px-10">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// hidden lg:block
