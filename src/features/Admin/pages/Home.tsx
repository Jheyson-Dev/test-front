import { NavLink, Outlet } from "react-router-dom";
// Icons
import { LayoutDashboard, LayoutGrid, LayoutList, LogOut } from "lucide-react";
import { toast } from "sonner";

// Interface
interface NavItems {
  name: string;
  url: string;
  icon: () => JSX.Element;
}

export const AdminHome = () => {
  const navItems: NavItems[] = [
    {
      name: "Usuarios",
      url: "/admin/user",
      icon: () => <LayoutList />,
    },
    {
      name: "Tiendas",
      url: "/admin/store",
      icon: () => <LayoutList />,
    },
    {
      name: "Asignacion",
      url: "/admin/user-store",
      icon: () => <LayoutList />,
    },
    {
      name: "Categoría",
      url: "/admin/category",
      icon: () => <LayoutGrid />,
    },
    {
      name: "Producto",
      url: "/admin/product",
      icon: () => <LayoutList />,
    },
    // {
    //   name: "Tienda Producto",
    //   url: "/admin/store-product",
    //   icon: () => <LayoutList />,
    // },
    {
      name: "Imagenes Producto",
      url: "/admin/image-product",
      icon: () => <LayoutList />,
    },
    {
      name: "Ofertas",
      url: "/admin/offer",
      icon: () => <LayoutList />,
    },
    {
      name: "Reemplazos",
      url: "/admin/replace",
      icon: () => <LayoutList />,
    },
    {
      name: "Aplicaciones",
      url: "/admin/application",
      icon: () => <LayoutList />,
    },
    {
      name: "Modelo Automóvil",
      url: "/admin/car-model",
      icon: () => <LayoutList />,
    },
    {
      name: "Marca Automovil",
      url: "/admin/car-brand",
      icon: () => <LayoutList />,
    },
    {
      name: "Reducciones",
      url: "/admin/reduction",
      icon: () => <LayoutList />,
    },
    {
      name: "Ingresos",
      url: "/admin/ingresos",
      icon: () => <LayoutList />,
    },

    {
      name: "Placas",
      url: "/admin/plates",
      icon: () => <LayoutList />,
    },
    {
      name: "Catalogo",
      url: "/admin/catalog",
      icon: () => <LayoutList />,
    },
    {
      name: "Compras",
      url: "/admin/purchase",
      icon: () => <LayoutList />,
    },
    {
      name: "Pedidos",
      url: "/admin/order",
      icon: () => <LayoutList />,
    },
    {
      name: "Traspasos",
      url: "/admin/transfer",
      icon: () => <LayoutList />,
    },
  ];
  return (
    <div className="container">
      <div className="flex min-h-screen">
        <div className="w-64 min-h-screen flex flex-col antialiased bg-gray-50 text-gray-800">
          <div className="flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
            <div className="flex items-center justify-center p-14 border-b text-3xl text-admin-blue font-semibold uppercase">
              <div>DeybiParts</div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
              <ul className="flex flex-col py-2 space-y-1">
                {navItems.map((item) => {
                  return (
                    <li key={item.url}>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          isActive
                            ? "flex flex-row items-center h-8 focus:outline-none hover:bg-gray-50  hover:text-gray-800 border-l-4 border-indigo-500 pr-6 ml-2 pl-2 font-semibold text-admin-blue "
                            : "flex flex-row items-center h-8 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ml-2 pl-2 font-semibold text-admin-gray"
                        }
                      >
                        {item.icon()}
                        <span className="ml-2 text-lg tracking-wide truncate">
                          {item.name}
                        </span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
              <div
                className="mt-5"
                onClick={() => {
                  localStorage.removeItem("rol");
                  localStorage.removeItem("usuario");
                  toast.success("Sesión cerrada");
                }}
              >
                <NavLink
                  to={"/login"}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50  hover:text-gray-800 border-l-4 border-transparent border-indigo-500 pr-6 ml-2 pl-2 font-semibold text-admin-blue"
                      : "flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ml-2 pl-2 font-semibold text-admin-gray"
                  }
                >
                  <LogOut />
                  <span className="ml-2 text-lg tracking-wide truncate">
                    Cerrar Sesión
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full py-14 px-10 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
