import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CartProvider } from "./contexts/cartContext";
import { WishListProvider } from "./contexts/wishListContext";
import { AuthProvider } from "./contexts/authContext";
import { LoginModalProvider } from "./contexts/loginModal";
import { ToastProvider } from "./contexts/toastContext";

import { IconContext } from "react-icons";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <AuthProvider>
    <ToastProvider>
      <LoginModalProvider>
        <CartProvider>
          <WishListProvider>
            <IconContext.Provider value={{ color: "#D97706" }}>
              <App />
            </IconContext.Provider>
          </WishListProvider>
        </CartProvider>
      </LoginModalProvider>
    </ToastProvider>
  </AuthProvider>,
  rootElement
);
