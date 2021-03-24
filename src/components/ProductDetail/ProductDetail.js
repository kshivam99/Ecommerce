import React, { useState } from "react";
import { useCart } from "../../contexts/cartContext";
import { useWishList } from "../../contexts/wishListContext";
import { Link } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { useProduct } from "../../contexts/productContext";
import "./ProductDetail.css";

const ratings = {
  1: "⭐",
  2: "⭐⭐",
  3: "⭐⭐⭐",
  4: "⭐⭐⭐⭐",
  5: "⭐⭐⭐⭐⭐",
};

function ProductDetail() {
  const {
    currentProduct: { id, name, image, price, inStock, fastDelivery, rating },
  } = useProduct();
  const { cart, setCart } = useCart();
  const { wishList, setWishList } = useWishList();
  const [reviews, setReviews] = useState([
    "awesome product",
    "worth every penny",
  ]);
  const [review, setReview] = useState("");

  function isWish() {
    let wish = false;
    wishList.map((item) => (item.id === id ? (wish = true) : null));
    return wish;
  }

  function handleWish() {
    if (filterItems(wishList, id).length !== 0) {
      setWishList((prev) => prev.filter((curr) => curr.id !== id));
    } else {
      setWishList([...wishList, { id, name, image, price }]);
    }
  }

  function filterItems(items, id) {
    return items.filter((curr) => curr.id === id);
  }

  function addToCart() {
    if (filterItems(cart, id).length !== 0) {
      setCart((prev) =>
        prev.map((curr) =>
          curr.id === id ? { ...curr, quantity: curr.quantity + 1 } : curr
        )
      );
    } else {
      setCart([...cart, { id, name, image, price, quantity: 1 }]);
    }
  }

  function handleReview(e) {
    if (e.key === "Enter") {
      setReviews((prev) => prev.concat(review));
      setReview("");
    }
  }
  return (
    <div className="product">
      <div className="product--detail">
        <div className="product--image">
          <img src={image} alt="" />
        </div>
        <div className="product--details">
          <h1>{name}</h1>
          <p>₹{price}</p>
          <p>Instock {inStock ? "Available" : "out of stock"}</p>
          <p>fast Delivery {fastDelivery ? "Available" : "Nope"}</p>
          <p>{ratings[rating]}</p>
        </div>
      </div>
      <div className="card-btn">
        <div className="addToCartBtn">
          <Link className="link" to="/cart">
            {inStock && <BiCart size={32} onClick={addToCart} />}
          </Link>
        </div>
        <div className="wish" onClick={handleWish}>
          {!isWish() ? <BsHeart size={32} /> : <BsHeartFill size={32} />}
        </div>
      </div>
      <div className="comments">
        <h1>Reviews</h1>
        <input
          value={review}
          style={{ border: "1px solid black" }}
          onChange={(e) => setReview(e.target.value)}
          onKeyDown={handleReview}
        />
        {reviews.map((curr) => (
          <p>{curr}</p>
        ))}
      </div>
    </div>
  );
}

export default ProductDetail;
