import api from "@/utils/axiosConfig";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

// Create the cart context
const CartContext = createContext();

// Create a custom hook to access the cart context
export const useCart = () => useContext(CartContext);

// Create the cart provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to the cart
  const addItemToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.id_producto === item.id_producto
    );

    if (existingItem) {
      // Increment the quantity of the existing item
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id_producto === item.id_producto
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // Add the new item to the cart
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from the cart
  const removeItemFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id_producto !== itemId));
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Add quantity to an item in the cart
  const addQuantityToItem = (itemId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id_producto === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Reduce quantity from an item in the cart
  const reduceQuantityFromItem = (itemId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id_producto === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Get the total cost of the items in the cart
  const getTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = Number(item.precio_venta);
      const quantity = Number(item.quantity);
      return sum + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity);
    }, 0);
  };

  // Get the stock of an item
  const getStock = (itemId) => {
    const item = cartItems.find((item) => item.id_producto === itemId);
    return item ? item.stock : 0;
  };

  const updateProductStock = async () => {
    try {
      // Loop over the items in the cart
      for (const item of cartItems) {
        // Make a GET request to get the current product data
        const response = await api.get(`/productos/${item.id_producto}`);
        const productData = response.data[0];

        // Calculate the new stock
        const newStock = productData.stock - item.quantity;

        // Update the stock in the product data
        productData.stock = newStock;
        delete productData.imagenes;
        delete productData.nombre_producto;

        console.log(productData);

        // Make a PUT request to update the product data
        await api.put(`/productos/${item.id_producto}`, productData);
      }
      toast.success("Stock actualizado correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });

      clearCart();

      // console.log("All products updated successfully");
    } catch (error) {
      console.error("Failed to update products", error);
    }
  };

  interface Reducir {
    id_producto: number;
    id_tienda: number;
    cantidad: number;
    usuario: string;
  }
  const reducir = async (data: Reducir) => {
    try {
      console.log(data);
      const response = await api.post("/reduccion_inventarios", data);
      // console.log(response.data);
      toast.success("Stock actualizado correctamente", {
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
        },
      });
      removeItemFromCart(data?.id_producto);
    } catch (error) {
      console.log();
      toast.error(error.response.data.body, {
        style: {
          backgroundColor: "#EF4444",
          color: "#fff",
        },
      });
      // console.error("Failed to update products", error);
    }
  };

  // Provide the cart context value
  const cartContextValue = {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    addQuantityToItem,
    reduceQuantityFromItem,
    getTotal,
    getStock,
    updateProductStock,
    reducir,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
