import { Header } from "../components/Header";
// Imagenes
// import logo from "../../../../assets/logo.svg";

// Hooks
import { useEffect, useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { HeaderDesktop } from "../components/HeaderDesktop";
import { useMarcaAutoAll } from "@/features/Admin/hooks/MarcaAuto/useMarcaAutoAll";

export const SearchModel = () => {
  // Estados
  const [selected, setSelected] = useState(false);
  const { data } = useMarcaAutoAll();
  console.log(data);

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
              {data?.map((item) => (
                <div key={item.id_marca_auto} className="">
                  <p>
                    <Link
                      to={`/worker/search-model/${item.id_marca_auto}`}
                      className="underline"
                    >
                      {item.nombre}
                    </Link>
                  </p>
                </div>
              ))}
            </div>
            <p className="text-2xl font-poppins font-semibold text-azul">
              Elija un modelo
            </p>
            <div className="">
              <Outlet />
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="flex ">
              <div className="w-1/6">
                <h2 className="text-2xl font-semibold mb-4  text-center font-poppins text-admin-gray">
                  Eliga una marca
                </h2>
                <div className="flex flex-col h-96 overflow-auto gap-2">
                  {data?.map((item) => (
                    <NavLink
                      to={`/worker/search-model/${item.id_marca_auto}`}
                      className="flex  items-center gap-2 p-2 bg-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border-2 border-admin-gray/10"
                      key={item.id_marca_auto}
                    >
                      <img
                        src={
                          item.img_url ||
                          "https://th.bing.com/th/id/OIP.7WQXYKGFHH-XyQ07pfqQXgHaDt?rs=1&pid=ImgDetMain"
                        }
                        alt=""
                        className="w-10 h-10"
                      />
                      <span>{item.nombre}</span>
                      {/* <span>({item.id_marca_auto})</span> */}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className=" w-5/6 px-10 flex flex-col">
                <h2 className="text-2xl font-semibold mb-4  text-center font-poppins text-admin-gray w-full">
                  Eliga un Modelo
                </h2>
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
