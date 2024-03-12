import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { CartProvider } from "./features/Worker/contexts/cartContext.tsx";
import { InputHomeProvider } from "./features/Worker/contexts/InputHomeContext.tsx";
import { TabsProvider } from "./features/Client/contexts/VistaContext.tsx";
import { InputClientProvider } from "./features/Client/contexts/inputSearch.tsx";

// QueryClient de tanstack/react-query
const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  queries: {
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60 * 1,
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TabsProvider>
          <InputHomeProvider>
            <InputClientProvider>
              <RouterProvider router={router}></RouterProvider>
              <Toaster position="top-right" duration={1000} />
            </InputClientProvider>
          </InputHomeProvider>
        </TabsProvider>
      </CartProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  </React.StrictMode>
);
