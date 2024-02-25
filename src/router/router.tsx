import { Home } from "@/features/Client/pages/Home";
import { Product } from "@/features/Client/pages/Product";
import { SearchCode } from "@/features/Client/pages/SearchCode";
import { SearchModel } from "@/features/Client/pages/SearchModel";
import { SearchModelProducts } from "@/features/Client/pages/SearchModelProducts";
import { SelectModel } from "@/features/Client/views/SelectModel";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
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

  // {
  //   path: "search-measure",
  //   element: <SearchModel />,
  // },
  {
    path: "/product/:id",
    element: <Product />,
  },
]);
