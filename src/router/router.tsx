import { Home } from "@/features/Client/Home/pages/Home";
import { Product } from "@/features/Client/Home/pages/Product";
import { SearchCode } from "@/features/Client/Home/pages/SearchCode";
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
    path: "/product/:id",
    element: <Product />,
  },
]);
