import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({children}) {
    const [ cart, setCart ] = useState(JSON.parse(localStorage.getItem("cart")) || []);

    return(
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
  }
  