import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../../contexts/cartContext";
import { useAuth } from "../../contexts/authContext";
import { useWishList } from "../../contexts/wishListContext";
import { Link } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import "./ProductDetail.css";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import ReactImageMagnify from "react-image-magnify";
import { BiRupee } from "react-icons/bi";
import { useToast } from "../../contexts/toastContext";

const ratings = {
  0: "Be the first one to review",
  1: "⭐",
  2: "⭐⭐",
  3: "⭐⭐⭐",
  4: "⭐⭐⭐⭐",
  5: "⭐⭐⭐⭐⭐",
};

function ProductDetail() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [currImage, setCurrImage] = useState("");
  const { id } = useParams();
  const { cart, setCart } = useCart();
  const { wishList, setWishList } = useWishList();
  const { auth } = useAuth();
  const [
    {
      description,
      brand,
      category,
      featured,
      images,
      name,
      new_price,
      old_price,
      rating,
      stock,
      total_rating,
    },
    setProduct,
  ] = useState({});
  const [reviews, setReviews] = useState([
    "awesome product",
    "worth every penny",
  ]);
  const [review, setReview] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
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
          response.data.cart &&
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
          console.log("wish", response.data.wishList);
          response.data.wishList && localStorage.setItem("wish", JSON.stringify(response.data.wishList));
        })();
      } catch (err) {
        console.log(err);
      }
    }
  }, [wishList]);

  useEffect(() => {
    try {
      (async function getData() {
        setIsLoading(true);
        const response = await axios.get(
          `https://protected-bastion-58177.herokuapp.com/products/${id}`
        );
        setProduct(response.data);
        setProduct((prev) => {
          setCurrImage(prev.images[0]);
          return prev;
        });
        setIsLoading(false);
      })();
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }, []);

  function isWish() {
    let wish = false;
    wishList.map((item) => (item.id === id ? (wish = true) : null));
    return wish;
  }

  function handleWish() {
    if (auth) {
      if (filterItems(wishList, id).length !== 0) {
        setWishList((prev) => prev.filter((curr) => curr.id !== id));
        toast(`${name} removed from Wishlist`,{
          type:"success"
        })
      } else {
        setWishList([...wishList, { id, name, images, new_price }]);
        toast(`${name} added to Wishlist`,{
          type:"success"
        })
      }
      
    }
  }

  function filterItems(items, id) {
    return items.filter((curr) => curr.id === id);
  }

  function addToCart() {
    if (auth) {
      if (filterItems(cart, id).length !== 0) {
        setCart((prev) =>
          prev.map((curr) =>
            curr.id === id ? { ...curr, quantity: curr.quantity + 1 } : curr
          )
        );
      } else {
        setCart([...cart, { id, name, images, new_price, quantity: 1 }]);
      }
      toast(`${name} added to cart`, {
        type: "success"
      });
    } else {
      toast("Sign in to add to cart",{
        type: "error"
      });
    }
  }

  function handleReview(e) {
    if (e.key === "Enter") {
      setReviews((prev) => prev.concat(review));
      setReview("");
    }
  }

  function getDiscount() {
    return (((old_price - new_price) / old_price) * 100).toFixed(0);
  }
  return (
    <div className="product">
      {isLoading ? (
        <Loader type="TailSpin" color="#F59E0B" height={100} width={100} />
      ) : (
        <>
          <div className="product--detail">
            <div className="image--array">
              {images &&
                images.map((item) => (
                  <img onClick={() => setCurrImage(item)} src={item} alt="" />
                ))}
            </div>
            <div className="product--image">
              <ReactImageMagnify
                enlargedImagePosition="over"
                {...{
                  smallImage: {
                    alt: brand,
                    isFluidWidth: true,
                    src: currImage,
                  },
                  largeImage: {
                    src: currImage,
                    width: 1200,
                    height: 1000,
                  },
                }}
              />
            </div>
            <div className="product--details">
              <h1 className="product--name">{name}</h1>
              <div className="product--price">
                <p className="new--price">
                  <BiRupee color={"#000"} />
                  {new_price}
                </p>
                <p className="old--price">
                  <BiRupee color={"#000"} />
                  {old_price}
                </p>
                <p className="discount">{`${getDiscount()}% off`}</p>
              </div>
              {stock ? (
                ""
              ) : (
                <div className="stock">
                  <h1>Sold Out</h1>
                  <p>This item is currently out of stock</p>
                </div>
              )}

              <div className="product--description">
                {description && description.map((item) => <ul>{item}</ul>)}
              </div>
              <p>fast Delivery {featured ? "Available" : "Nope"}</p>
              <p>{ratings[rating]}</p>
            </div>
          </div>
          <div className="card-btn">
            <div className="addToCartBtn">
              {stock && <BiCart size={32} onClick={addToCart} />}
            </div>
            <div className="wish" onClick={handleWish}>
              {!isWish() ? <BsHeart size={26} /> : <BsHeartFill size={26} />}
            </div>
          </div>
          {/* <div className="comments">
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
          </div> */}
        </>
      )}
    </div>
  );
}

export default ProductDetail;
