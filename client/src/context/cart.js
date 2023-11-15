import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = (props) => {
  const [cart, setCart] = useState();

  useEffect(() => {
    let existingCardItem = localStorage.getItem("cart");
    setCart(JSON.parse(existingCardItem));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
};

//custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
