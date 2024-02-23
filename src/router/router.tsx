import { Home } from "@/features/Client/Home/pages/Home";
import { Product } from "@/features/Client/Home/pages/Product";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
]);
