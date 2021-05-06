import React,{ useEffect, useState } from "react";
import { useWishList } from "../../contexts/wishListContext";
import "./WishList.css";
import { useCart } from "../../contexts/cartContext";
import { BiRupee } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { useAuth } from "../../contexts/authContext";
import axios from "axios";
import { useToast } from "../../contexts/toastContext";
import { BsHeartFill } from "react-icons/bs";



function WishList() {
  const { auth } = useAuth();
  const { toast } = useToast();
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
          res.data.wishList && setWishList(res.data.wishList);
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

  function removeWish(item) {
    setWishList((prev) => prev.filter((curr) => curr.id !== item.id));
    toast(`${item.name} removed from wishlist`, {
      type: "success"
    });
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
    toast(`${item.name} added to cart`, {
      type: "success"
    });
  }

  return (
    <div className="wishlist--container">
      {wishList.map((item) => (
         <div className="card2--body">
         <img
           src={item.images[0]}
           alt=""
         />
         <div className="card--details">
           <div className="rating--row">
             {[...Array(item.rating)].map((i) => (
               <AiFillStar color={"#D97706"} size={24} />
             ))}
           </div>
           <h4>{item.name}</h4>
           <h5 className="new__price">
             <BiRupee />
             {item.new_price}
           </h5>
           <h5 className="old__price">
             <BiRupee />
             {item.old_price}
           </h5>
           <h5 className="offer">16% OFF</h5>
         <div className="btn--row">
           <button className="btn--primary btn-md" onClick={() => addToCart(item)}>Add to cart</button>
           <BsHeartFill onClick={() => removeWish(item)} size={26}/>
         </div>
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
