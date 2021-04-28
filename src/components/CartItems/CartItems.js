import React, { useEffect, useState } from "react";
import { useCart } from "../../contexts/cartContext";
import "./CartItem.css";
import { useAuth } from "../../contexts/authContext";
import { useWishList } from "../../contexts/wishListContext";
import axios from "axios";
import Loader from "react-loader-spinner";

function CartItem({ item, cart, setCart }) {
  function incItem() {
    setCart((prev) =>
      prev.map((curr) =>
        curr.id === item.id ? { ...curr, quantity: curr.quantity + 1 } : curr
      )
    );
  }

  function decItem() {
    let bool;
    cart.map((curr) =>
      curr.id === item.id
        ? curr.quantity === 1
          ? (bool = true)
          : (bool = false)
        : null
    );
    bool
      ? setCart((prev) => prev.filter((curr) => curr.id !== item.id))
      : setCart((prev) =>
          prev.map((curr) =>
            curr.id === item.id
              ? { ...curr, quantity: curr.quantity - 1 }
              : curr
          )
        );
  }

  function removeItem() {
    setCart((prev) => prev.filter((curr) => curr.id !== item.id));
  }

  return (
    <div key={item.id} className="cartItem">
      <img src={item.images && item.images[0]} alt="" />
      <div className="cartItemDetails">
        <h1>{item.name}</h1>
        <h4>₹{item.new_price}</h4>
        <button onClick={incItem}>+</button>
        <p>{item.quantity}</p>
        <button onClick={decItem}>-</button>
        <button onClick={removeItem}>Remove</button>
      </div>
    </div>
  );
}

export default function CartItems() {
  const { cart, setCart } = useCart();
  const { auth, setAuth } = useAuth();
  const { wishList, setWishList } = useWishList();
  const [isLoading, setIsLoading] = useState(false);
  console.log(auth);

  useEffect(() => {
    if (auth) {
      try {
        (async function getData() {
          setIsLoading(true);
          const res = await axios.get(
            "https://protected-bastion-58177.herokuapp.com/cart",
            {
              headers: {
                "auth-token": auth.token,
              },
            }
          );
          console.log(res);
          setIsLoading(false);
          setCart(res.data.cart);
        })();
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }
  }, []);

  useEffect(async () => {
    if (auth) {
      try {
        (async function postCart() {
          const response = await axios.post(
            "https://protected-bastion-58177.herokuapp.com/cart",
            {
              cart: cart,
            },
            {
              headers: {
                "auth-token": auth.token,
              },
            }
          );
          console.log("cart", response.data.cart);
          localStorage.setItem("cart", JSON.stringify(response.data.cart));
        })();
      } catch (err) {
        console.log(err);
      }
    }
  }, [cart]);

  function getTotal() {
    let total = 0;
    cart.map(
      (item) => (total += parseInt(item.new_price) * parseInt(item.quantity))
    );
    return total;
  }

  function handleLogout() {
    setAuth(null);
    setCart([]);
    localStorage.clear();
  }
  return (
    <div className="cartItems">
      {isLoading ? (
        <Loader type="TailSpin" color="#F59E0B" height={100} width={100} />
      ) : (
        <>
          {cart.map((item) => (
            <CartItem item={item} cart={cart} setCart={setCart} />
          ))}
          {!cart.length && (
            <h1
              style={{
                color: "#D97706",
                fontSize: "2rem",
                margin: "4rem 0",
                opacity: "0.6",
              }}
            >
              {" "}
              Add items in your cart to display here
            </h1>
          )}
          <h1
            style={{
              textAlign: "center",
              width: "100%",
            }}
          >
            Total Cart value: ₹{getTotal()}
          </h1>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}
