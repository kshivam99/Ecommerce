import React,{ useEffect, useState } from "react";
import { useWishList } from "../../contexts/wishListContext";
import "./WishList.css";
import { useCart } from "../../contexts/cartContext";
import { BsHeartFill } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { useAuth } from "../../contexts/authContext";
import axios from "axios";


function WishList() {
  const { auth } = useAuth();
  const { wishList, setWishList } = useWishList();
  const { cart, setCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (auth) {
      try {
        (async function getData() {
          setIsLoading(true);
          const res = await axios.get(
            "https://protected-bastion-58177.herokuapp.com/wish",
            {
              headers: {
                "auth-token": auth.token,
              },
            }
          );
          console.log(res);
          setIsLoading(false);
          setWishList(res.data.wishList);
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


  useEffect(async () => {
    if (auth) {
      try {
        (async function postCart() {
          const response = await axios.post(
            "https://protected-bastion-58177.herokuapp.com/wish",
            {
              wishList: wishList,
            },
            {
              headers: {
                "auth-token": auth.token,
              },
            }
          );
          console.log("cart", response.data.wishList);
          localStorage.setItem("wish", JSON.stringify(response.data.wishList));
        })();
      } catch (err) {
        console.log(err);
      }
    }
  }, [wishList]);

  function removeWish(id) {
    setWishList((prev) => prev.filter((curr) => curr.id !== id));
  }

  function filterItems(items, id) {
    return items.filter((curr) => curr.id === id);
  }

  function addToCart(item) {
    if (filterItems(cart, item.id).length !== 0) {
      setCart((prev) =>
        prev.map((curr) =>
          curr.id === item.id ? { ...curr, quantity: curr.quantity + 1 } : curr
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: item.id,
          name: item.name,
          images: item.images,
          new_price: item.new_price,
          quantity: 1,
        },
      ]);
    }
  }

  return (
    <div>
      {wishList.map((item) => (
        <div className="wishlist-item">
          <img src={item.images[0]} alt="" />
          <div className="wishlistdetails">
            <h1>{item.name}</h1>
            <h1>₹{item.new_price}</h1>
          </div>
          <div className="wish--btn">
            <BsHeartFill onClick={() => removeWish(item.id)} size={32} />
            <BiCart size={32} onClick={() => addToCart(item)} />
          </div>
        </div>
      ))}
      <h4
        style={{
          margin: "10rem 0",
          opacity: "0.6",
          color: "#D97706",
          wordSpacing: "0.3em",
        }}
      >
        {!wishList.length && "You have no wishes, Add few"}
      </h4>
    </div>
  );
}

export default WishList;
