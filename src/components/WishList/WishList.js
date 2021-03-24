import React from "react";
import { useWishList } from "../../contexts/wishListContext";
import "./WishList.css";
import { useCart } from "../../contexts/cartContext";
import { BsHeartFill } from "react-icons/bs";
import { BiCart } from "react-icons/bi";


function WishList() {
  const { wishList, setWishList } = useWishList();
  const { cart, setCart } = useCart();

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
          image: item.image,
          price: item.price,
          quantity: 1,
        },
      ]);
    }
  }

  return (
    <div>
      {wishList.map((item) => (
        <div className="wishlist-item">
          <img src={item.image} alt="" />
          <div className="wishlistdetails">
            <h1>{item.name}</h1>
            <h1>₹{item.price}</h1>
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
