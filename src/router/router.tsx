// Cliente View
import { AdminHome } from "@/features/Admin/pages/Home";
import { CreateProduct } from "@/features/Admin/views/Producto/CreateProduct";
import { EditProduct } from "@/features/Admin/views/Producto/EditProduct";
import { ProductList } from "@/features/Admin/views/Producto/ProductList";
// import { Dashboard } from "@/features/Admin/views/Dashboard";
import { CreateUser } from "@/features/Admin/views/User/CreateUser";
import { EditUser } from "@/features/Admin/views/User/EditUser";
import { User } from "@/features/Admin/views/User/User";
import { Login } from "@/features/Auth/components/Login";
import { Home } from "@/features/Client/pages/Home";
import { Product } from "@/features/Client/pages/Product";
import { SearchCode } from "@/features/Client/pages/SearchCode";
import { SearchModel } from "@/features/Client/pages/SearchModel";
import { SearchModelProducts } from "@/features/Client/pages/SearchModelProducts";
import { SelectModel } from "@/features/Client/views/SelectModel";

// Worker View
import { Home as WorkerHome } from "@/features/Worker/pages/Home";
import { Product as ProductWorker } from "@/features/Worker/pages/Product";
import { SearchCode as SearchCodeWorker } from "@/features/Worker/pages/SearchCode";
import { SearchModel as SearchModelWorker } from "@/features/Worker/pages/SearchModel";
import { SearchModelProducts as SearchModelProductsWorker } from "@/features/Worker/pages/SearchModelProducts";
import { SelectModel as SelectModelWorker } from "@/features/Worker/views/SelectModel";
import { SearchMedida as SearchMedidaWorker } from "@/features/Worker/pages/SearchMedida";
import { SearchMedidaProducts as SearchMedidaProductsWorker } from "@/features/Worker/pages/SearchMedidaProducts";

import { createBrowserRouter } from "react-router-dom";
import { CategoriaList } from "@/features/Admin/views/Categoria/CategoriaList";
import { CreateCategoria } from "@/features/Admin/views/Categoria/CreateCategoria";
import { EditCategoria } from "@/features/Admin/views/Categoria/EditCategoria";
import { Register } from "@/features/Auth/components/Register";
import { SearchMedida } from "@/features/Client/pages/SearchMedida";
import { ImagenesProductoList } from "@/features/Admin/views/ImagenesProducto/ImagenesProductoList";
import { CreateImagenesProducto } from "@/features/Admin/views/ImagenesProducto/CreateImagenesProducto";
import { EditImagenesProduct } from "@/features/Admin/views/ImagenesProducto/EditImagenesProduct";
import { ReemplazosList } from "@/features/Admin/views/Reemplazos/ReemplazosList";
import { CreateReemplazo } from "@/features/Admin/views/Reemplazos/CreateReemplazo";
import { EditReemplazo } from "@/features/Admin/views/Reemplazos/EditReemplazo";
import { AplicacionesList } from "@/features/Admin/views/Aplicaciones/AplicacionesList";
import { EditAplicacion } from "@/features/Admin/views/Aplicaciones/EditAplicacion";
import { CreateAplicacion } from "@/features/Admin/views/Aplicaciones/CreateAplicacion";
import { ModeloAutomovilList } from "@/features/Admin/views/ModeloAutomovil/ModeloAutomovilList";
import { CreateModeloAutomovil } from "@/features/Admin/views/ModeloAutomovil/CreateModeloAutomovil";
import { EditModeloAutomovil } from "@/features/Admin/views/ModeloAutomovil/EditModeloAutomovil";
import { MarcaAutomovilList } from "@/features/Admin/views/MarcaAutomovil/MarcaAutomovilList";
import { CreateMarcaAutomovil } from "@/features/Admin/views/MarcaAutomovil/CreateMarcaAutomovil";
import { EditMarcaAutomovil } from "@/features/Admin/views/MarcaAutomovil/EditMarcaAutomovil";
import { IngresosList } from "@/features/Admin/views/Ingresos/IngresosList";
import { CreateIngresos } from "@/features/Admin/views/Ingresos/CreateIngresos";
import { EditIngresos } from "@/features/Admin/views/Ingresos/EditIngresos";
import { PlacasList } from "@/features/Admin/views/Placas/PlacasList";
import { CreatePlacas } from "@/features/Admin/views/Placas/CreatePlacas";
import { EditPlacas } from "@/features/Admin/views/Placas/EditPlacas";
import { CatalogoList } from "@/features/Admin/views/Catalogo/CatalogoList";
import { ExportarPdf } from "@/features/Admin/views/Catalogo/ExportarPdf";
import { Carrito } from "@/features/Worker/pages/Carrito";
import { SearchMedidaProducts } from "@/features/Client/pages/SearchMedidaProducts";
import { TiendasList } from "@/features/Admin/views/Tiendas/TiendasList";
import { CreateTienda } from "@/features/Admin/views/Tiendas/CreateTienda";
import { EditTienda } from "@/features/Admin/views/Tiendas/EditTienda";
import { UsuarioTiendaList } from "@/features/Admin/views/UsuarioTienda/UsuarioTiendaList";
import { CreateUsuarioTienda } from "@/features/Admin/views/UsuarioTienda/CreateUsuarioTienda";
import { EditUsuarioTienda } from "@/features/Admin/views/UsuarioTienda/EditUsuarioTienda";
import { OfertasList } from "@/features/Admin/views/Ofertas/OfertasList";
import { InventariosList } from "@/features/Admin/views/Inventarios/InventariosList";
import { ComprasList } from "@/features/Admin/views/Compras/ComprasList";
import { EditCompras } from "@/features/Admin/views/Compras/EditCompras";
import { CreateCompras } from "@/features/Admin/views/Compras/CreateCompras";
import { PedidosList } from "@/features/Admin/views/Pedidos/PedidosList";
import { TraspasosList } from "@/features/Admin/views/Traspasos/TraspasosList";
import { CreatePedidos } from "@/features/Admin/views/Pedidos/CreatePedidos";
import { EditPedidos } from "@/features/Admin/views/Pedidos/EditPedidos";
import { CreateOfertas } from "@/features/Admin/views/Ofertas/CreateOfertas";
import { EditOfertas } from "@/features/Admin/views/Ofertas/EditOfertas";
import { NotFount } from "@/features/shared/NotFount";
import { TiendaProductoList } from "@/features/Admin/views/TiendaProducto/TiendaProductoList";
import { EditTiendaProducto } from "@/features/Admin/views/TiendaProducto/EditTiendaProducto";
import { CreateTiendaProducto } from "@/features/Admin/views/TiendaProducto/CreateTiendaProducto";
import { ImportExcel } from "@/features/Admin/views/Producto/ImportExcel";
import { CreateTraspasos } from "@/features/Admin/views/Traspasos/CreateTraspasos";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search-code",
    element: <SearchCode />,
  },
  {
    path: "/search-model",
    element: <SearchModel />,
    children: [
      {
        path: "/search-model/:id",
        element: <SelectModel />,
      },
    ],
  },
  {
    path: "/search-model/product/:id",
    element: <SearchModelProducts />,
  },
  {
    path: "/search-medida",
    element: <SearchMedida />,
    children: [
      {
        path: "/search-medida/:id",
        element: <SearchMedidaProducts />,
      },
    ],
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/worker",
    element: <WorkerHome />,
  },
  {
    path: "/worker/search-code",
    element: <SearchCodeWorker />,
  },
  {
    path: "/worker/search-model",
    element: <SearchModelWorker />,
    children: [
      {
        path: "/worker/search-model/:id",
        element: <SelectModelWorker />,
      },
    ],
  },
  {
    path: "/worker/search-model/product/:id",
    element: <SearchModelProductsWorker />,
  },
  {
    path: "/worker/search-medida",
    element: <SearchMedidaWorker />,
    children: [
      {
        path: "/worker/search-medida/:id",
        element: <SearchMedidaProductsWorker />,
      },
    ],
  },
  {
    path: "/worker/product/:id",
    element: <ProductWorker />,
  },
  {
    path: "/worker/cart",
    element: <Carrito />,
  },
  {
    path: "/admin",
    element: <AdminHome />,
    children: [
      // {
      //   index: true,
      //   element: <Dashboard />,
      // },
      {
        path: "/admin/user",
        element: <User />,
      },
      {
        path: "/admin/user/create",
        element: <CreateUser />,
      },
      {
        path: "/admin/user/:id",
        element: <EditUser />,
      },
      // Rutas para Tiendas
      {
        path: "/admin/store",
        element: <TiendasList />,
      },
      {
        path: "/admin/store/create",
        element: <CreateTienda />,
      },
      {
        path: "/admin/store/:id",
        element: <EditTienda />,
      },
      // Rutas para Usuairo Tienda
      {
        path: "/admin/user-store",
        element: <UsuarioTiendaList />,
      },
      {
        path: "/admin/user-store/create",
        element: <CreateUsuarioTienda />,
      },
      {
        path: "/admin/user-store/:id",
        element: <EditUsuarioTienda />,
      },
      // Rutas para Productos
      {
        path: "/admin/product",
        element: <ProductList />,
      },
      {
        path: "/admin/product/create",
        element: <CreateProduct />,
      },
      {
        path: "/admin/product/:id",
        element: <EditProduct />,
      },
      {
        path: "/admin/product/import",
        element: <ImportExcel />,
      },
      // Rutas para Tienda Productos
      {
        path: "/admin/store-product",
        element: <TiendaProductoList />,
      },
      {
        path: "/admin/store-product/:id",
        element: <EditTiendaProducto />,
      },
      {
        path: "/admin/store-product/create",
        element: <CreateTiendaProducto />,
      },
      // Rutas para Categorias
      {
        path: "/admin/category",
        element: <CategoriaList />,
      },
      {
        path: "/admin/category/create",
        element: <CreateCategoria />,
      },
      {
        path: "/admin/category/:id",
        element: <EditCategoria />,
      },
      // Rutas para las Imagenes de los Productos
      {
        path: "/admin/image-product",
        element: <ImagenesProductoList />,
      },
      {
        path: "/admin/image-product/create",
        element: <CreateImagenesProducto />,
      },
      {
        path: "/admin/image-product/:id",
        element: <EditImagenesProduct />,
      },
      // Rutas apra ofertas
      {
        path: "/admin/offer",
        element: <OfertasList />,
      },
      {
        path: "/admin/offer/create",
        element: <CreateOfertas />,
      },
      {
        path: "/admin/offer/:id",
        element: <EditOfertas />,
      },
      // Rutas Para reemplazos
      {
        path: "/admin/replace",
        element: <ReemplazosList />,
      },
      {
        path: "/admin/replace/create",
        element: <CreateReemplazo />,
      },
      {
        path: "/admin/replace/:id",
        element: <EditReemplazo />,
      },
      // Rutas para Aplicaciones
      {
        path: "/admin/application",
        element: <AplicacionesList />,
      },
      {
        path: "/admin/application/create",
        element: <CreateAplicacion />,
      },
      {
        path: "/admin/application/:id",
        element: <EditAplicacion />,
      },
      // Rutas para Modelo Auto
      {
        path: "/admin/car-model",
        element: <ModeloAutomovilList />,
      },
      {
        path: "/admin/car-model/create",
        element: <CreateModeloAutomovil />,
      },
      {
        path: "/admin/car-model/:id",
        element: <EditModeloAutomovil />,
      },
      // Rutas para Reducciones
      {
        path: "/admin/reduction",
        element: <InventariosList />,
      },
      // Rutas para Marca de Auto
      {
        path: "/admin/car-brand",
        element: <MarcaAutomovilList />,
      },
      {
        path: "/admin/car-brand/create",
        element: <CreateMarcaAutomovil />,
      },
      {
        path: "/admin/car-brand/:id",
        element: <EditMarcaAutomovil />,
      },
      // Rutas para Ingresos
      {
        path: "/admin/ingresos",
        element: <IngresosList />,
      },
      {
        path: "/admin/ingresos/create",
        element: <CreateIngresos />,
      },
      {
        path: "/admin/ingresos/:id",
        element: <EditIngresos />,
      },
      // Rutas para Placas
      {
        path: "/admin/plates",
        element: <PlacasList />,
      },
      {
        path: "/admin/plates/create",
        element: <CreatePlacas />,
      },
      {
        path: "/admin/plates/:id",
        element: <EditPlacas />,
      },
      // Rutas para Catalogo
      {
        path: "/admin/catalog",
        element: <CatalogoList />,
      },
      {
        path: "/admin/catalog/:mode",
        element: <ExportarPdf />,
      },
      {
        path: "/admin/purchase",
        element: <ComprasList />,
      },
      {
        path: "/admin/purchase/create",
        element: <CreateCompras />,
      },
      {
        path: "/admin/purchase/:id",
        element: <EditCompras />,
      },
      {
        path: "/admin/order",
        element: <PedidosList />,
      },
      {
        path: "/admin/order/create",
        element: <CreatePedidos />,
      },
      {
        path: "/admin/order/:id",
        element: <EditPedidos />,
      },
      {
        path: "/admin/transfer",
        element: <TraspasosList />,
      },
      {
        path: "/admin/transfer/create",
        element: <CreateTraspasos />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFount />,
  },
]);
