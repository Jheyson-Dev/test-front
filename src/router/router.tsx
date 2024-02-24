import { Home } from "@/features/Client/Home/pages/Home";
import { Product } from "@/features/Client/Home/pages/Product";
import { SearchCode } from "@/features/Client/Home/pages/SearchCode";
import { SearchModel } from "@/features/Client/Home/pages/SearchModel";
import { SearchModelProducts } from "@/features/Client/Home/pages/SearchModelProducts";
import { SelectModel } from "@/features/Client/Home/views/SelectModel";
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
