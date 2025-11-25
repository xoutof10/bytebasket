import { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  /* ---------------------- Add to Cart ---------------------- */
  const addToCart = (product) => {
    const itemInCart = cartItem.find((item) => item.id === product.id);

    if (itemInCart) {
      // increase quantity if already in cart
      const updatedCart = cartItem.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItem(updatedCart);
      toast.success("Product quantity increased!");
    } else {
      // add new item
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      toast.success("Product is added to cart!");
    }
  };

  /* ---------------------- Update Quantity ---------------------- */
  const updateQuantity = (cartItem, productId, action) => {
    setCartItem(
      cartItem
        .map((item) => {
          if (item.id === productId) {
            let newUnit = item.quantity;

            if (action === "increase") {
              newUnit++;
              toast.success("Quantity is increased!");
            } else if (action === "decrease") {
              newUnit--;
              toast.success("Quantity is decreased!");
            }

            return newUnit > 0 ? { ...item, quantity: newUnit } : null;
          }
          return item;
        })
        .filter((item) => item != null)
    );
  };

  /* ---------------------- Delete Item ---------------------- */
  const deleteItem = (productId) => {
    setCartItem(cartItem.filter((item) => item.id !== productId));
    toast.success("Product is deleted from cart!");
  };

  return (
    <CartContext.Provider
      value={{ cartItem, setCartItem, addToCart, deleteItem, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
