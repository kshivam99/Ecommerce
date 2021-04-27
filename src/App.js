import React, { useEffect } from "react";
import "./styles.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import CartItems from "./components/CartItems/CartItems";
import WishList from "./components/WishList/WishList";
import Product from "./components/ProductDetail/ProductDetail";
import Products from "./components/Product/Products";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import { useCart } from "./contexts/cartContext";
import { useAuth } from "./contexts/authContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "./contexts/toastContext";
import axios from "axios";
import { useWishList } from "./contexts/wishListContext";

export default function App() {
  const { auth, setAuth } = useAuth();
  const { ToastContainer } = useToast();
  const { setCart } = useCart();
  const { setWishList } = useWishList();

  useEffect(() => {
    if (auth) {
      try {
        (async function getData() {
          const res = await axios.get(
            "https://whispering-cove-66440.herokuapp.com/cart",
            {
              headers: {
                "auth-token": auth.token,
              },
            }
          );
          console.log(res);
          setCart(res.data.cart);
        })();
      } catch (err) {
        console.log(err);
      }
    }
  }, [auth]);

  useEffect(() => {
    if (auth) {
      try {
        (async function getData() {
          const res = await axios.get(
            "https://whispering-cove-66440.herokuapp.com/wish",
            {
              headers: {
                "auth-token": auth.token,
              },
            }
          );
          console.log(res);
          setWishList(res.data.wishList);
        })();
      } catch (err) {
        console.log(err);
      }
    }
  }, [auth]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/cart">
            {auth ? <Redirect to="/cartItems" /> : <Login />})
          </Route>
          <Route path="/cartItems">
            <CartItems />
          </Route>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route path="/products/:category">
            <Products />
          </Route>
          <Route path="/wishlist">
            <WishList />
          </Route>
          <Route path="/login">{auth ? <Redirect to="/" /> : <Login />})</Route>
          <Route path="/product/:id">
            <Product />
          </Route>
        </Switch>
      </Router>
      <ToastContainer
        style={{ position: "fixed", top: "85vh", right: "1rem" }}
      />
      {/* <Footer /> */}
    </div>
  );
}
