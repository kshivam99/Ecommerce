import React from "react";
import "./styles.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import CartItems from "./components/CartItems/CartItems";
import WishList from "./components/WishList/WishList";
import Product from "./components/ProductDetail/ProductDetail";
import Products from "./components/Product/Products";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { IconContext } from "react-icons";

export default function App() {
  return (
    <IconContext.Provider value={{ color: "#D97706" }}>
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/cart">
              <CartItems />
            </Route>
            <Route exact path="/">
              <Header />
              <Home />
            </Route>
            <Route path="/products">
              <Products />
            </Route>
            <Route path="/wishlist">
              <WishList />
            </Route>
            <Route path="/product">
              <Product />
            </Route>
          </Switch>
        </Router>
      </div>
    </IconContext.Provider>
  );
}
