import { Header } from "../components/Header";
// Imagenes
import logo from "../../../assets/logo.svg";

// Shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Icons
import { Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderDesktop } from "../components/HeaderDesktop";
import { TopButton } from "../components/TopButton";
import { UseProductAll } from "@/features/Admin/hooks/Product/UseProductAll";
import { InputContext, InputProvider } from "../contexts/InputHomeContext";
import { toast } from "sonner";

export const Home = () => {
  const navigate = useNavigate();

  // Estados

  const { data } = UseProductAll();

  const { inputValue, setInputValue } = useContext(InputContext);

  const [filter, setFilter] = useState([]);

  const filterData = filter.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(inputValue.toLowerCase())
    )
  );
  console.log(filterData);

  const [tabs, setTabs] = useState({
    ofertas: false,
    ingresos: false,
  });

  // const handleClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") alert("Buscando");
  // };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (data) {
      setFilter(data);
    }
  }, [data]);

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
            <div className="flex w-full items-center justify-center">
              <Input
                type="text"
                placeholder="Buscar..."
                className="placeholder:font-prosto-one placeholder:text-base border-2 border-r-0 rounded-r-none border-border-gray focus-visible:ring-0 focus-visible:ring-offset-0 max-w-[80%]"
                defaultValue={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
              <Button
                type="submit"
                className="bg-bg-search  rounded-l-none border-2 border-l-0 border-border-gray text-azul hover:bg-azul hover:text-blanco"
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
          {inputValue === "" ? (
            <div>
              {/* Banner de Ofertas */}
              <div></div>
              {/* Lista de Productos */}
              <div className="">
                {/* Botones de cambio de secciones */}

                <Tabs defaultValue="mas_buscados" className="">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="mas_buscados">Mas buscados</TabsTrigger>
                    <TabsTrigger value="ofertas">Ofertas</TabsTrigger>
                    {/* <TabsTrigger value="ingresos">Ingresos</TabsTrigger> */}
                  </TabsList>
                  <TabsContent value="mas_buscados">
                    <div className="font-prosto-one flex flex-wrap gap-2 md:gap-4 lg:justify-start justify-center text-azul py-4">
                      {data
                        ?.filter((item) => item.consultas > 0)
                        .map((item) => (
                          <div
                            className="w-40 lg:w-52 flex flex-col gap-4 py-4 px-2 rounded-lg shadow-lg border-[2px] border-border-gray hover:border-negro"
                            key={item?.id_producto}
                          >
                            <Link
                              to={`/worker/product/${item.id_producto}`}
                              className="flex flex-col items-center gap-2"
                            >
                              <p className="text-base text-center leading-none">
                                {item.nombre_producto}
                              </p>
                              <p className="text-sm">{item.marca_fabricante}</p>
                              <div>
                                <img
                                  src={
                                    item?.imagenes[0]?.img_url
                                      ? item?.imagenes[0]?.img_url
                                      : "https://th.bing.com/th/id/OIP.7WQXYKGFHH-XyQ07pfqQXgHaDt?rs=1&pid=ImgDetMain"
                                  }
                                  alt="Imagen de un producto"
                                  className="object-cover rounded-lg h-40"
                                />
                              </div>
                              <p>S/. {item.precio_venta}</p>
                            </Link>
                            <Button
                              className=" bg-azul text-blanco font-prosto-one  border-2 border-azul w-full hover:bg-azul"
                              onClick={() => {
                                navigate(`/worker/product/${item.id_producto}`);
                              }}
                            >
                              Ver producto
                            </Button>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="ofertas">
                    <div className="font-prosto-one flex flex-wrap gap-2 md:gap-4 justify-start text-azul py-4">
                      {data
                        ?.filter((item) => item.ofertas.length > 0)
                        .map((item) => (
                          <div
                            className="w-40 lg:w-52 flex flex-col gap-4 py-4 px-2 rounded-lg shadow-lg border-[2px] border-border-gray hover:border-negro"
                            key={item?.id_producto}
                          >
                            <Link
                              to={`/worker/product/${item.id_producto}`}
                              className="flex flex-col items-center gap-2"
                            >
                              <p className="text-base text-center leading-none">
                                {item.nombre_producto}
                              </p>
                              <p className="text-sm">{item.marca_fabricante}</p>
                              <div>
                                <img
                                  src={
                                    item?.imagenes[0]?.img_url
                                      ? item.imagenes[0]?.img_url
                                      : "https://th.bing.com/th/id/OIP.7WQXYKGFHH-XyQ07pfqQXgHaDt?rs=1&pid=ImgDetMain"
                                  }
                                  alt="Imagen de un producto"
                                  className="object-cover rounded-lg h-40"
                                />
                              </div>
                              <p>S/. {item?.precio_venta}</p>
                            </Link>
                            <Button
                              className=" bg-azul text-blanco font-prosto-one  border-2 border-azul w-full hover:bg-azul"
                              onClick={() => addItemToCart(item)}
                            >
                              Anadir al carrito
                            </Button>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="ingresos">
                    <div>Ingresos</div>
                  </TabsContent>
                </Tabs>
                {/* Grilla de productos */}
              </div>
            </div>
          ) : (
            <div className="">
              {filterData?.length > 0 ? (
                <div className="font-prosto-one flex flex-wrap gap-8 md:gap-4 lg:justify-start justify-center text-azul py-4">
                  {filterData.map((item) => (
                    <div
                      className="w-40 lg:w-52 flex flex-col gap-4 py-4 px-2 rounded-lg shadow-lg border-[2px] border-border-gray hover:border-negro"
                      key={item?.id_producto}
                    >
                      <Link
                        to={`/worker/product/${item.id_producto}`}
                        className="flex flex-col gap-2 items-center"
                      >
                        <p className="text-base text-center leading-none">
                          {item.nombre_producto}
                        </p>
                        <p className="text-sm">{item.marca_fabricante}</p>
                        <div>
                          <img
                            src={
                              item?.imagenes[0]?.img_url ||
                              "https://th.bing.com/th/id/OIP.7WQXYKGFHH-XyQ07pfqQXgHaDt?rs=1&pid=ImgDetMain"
                            }
                            alt="Imagen de un producto"
                            className="object-cover rounded-lg h-40"
                          />
                        </div>
                        <p>S/. {item.precio_venta}</p>
                        <Button
                          className=" bg-azul text-blanco font-prosto-one  border-2 border-azul w-full hover:bg-azul"
                          // onClick={() => addItemToCart(item)}
                        >
                          Ver producto
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <span className=" flex justify-center w-full">
                  No se encontraron coincidencias con su busqueda
                </span>
              )}
            </div>
          )}
        </div>
        <TopButton />
      </div>
    </div>
  );
};
