import React from "react";
import ReactDOM from "react-dom";
import setupMockServer from "./api/mock.server";
import App from "./App";
import  { CartProvider } from "./contexts/cartContext";
import { WishListProvider } from "./contexts/wishListContext";
import { ProductProvider } from "./contexts/productContext";


setupMockServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
    <CartProvider>
      <WishListProvider>
        <ProductProvider>
        <App />
        </ProductProvider>
      </WishListProvider>
    </CartProvider>,
  rootElement
);
