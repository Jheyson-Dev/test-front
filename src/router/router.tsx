// Cliente View
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

import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
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
    path: "/worker/product/:id",
    element: <ProductWorker />,
  },
]);
