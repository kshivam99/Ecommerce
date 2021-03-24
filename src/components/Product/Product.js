import React from "react";
import "./Product.css";
import { useProduct } from "../../contexts/productContext";
import { Link } from "react-router-dom";

function Product({ id, name, image, price, inStock, fastDelivery, rating }) {
  const { setCurrentProduct } = useProduct();

  return (
    <>
      <Link className="link" to="/product">
        <div
          onClick={() =>
            setCurrentProduct({
              id,
              name,
              image,
              price,
              inStock,
              fastDelivery,
              rating,
            })
          }
          className="product-card"
          style={{
            opacity:inStock?"1":"0.3"
          }}
        >
          <img src={image} />
          <h1>{name}</h1>
          <p>₹{price}</p>
          <p>{inStock ? <p style={{color:"green"}}>Instock</p> : <p style={{color:"red"}}>out of stock</p>}</p>
          <p>{fastDelivery ? <span className="badge">fast delivery</span> : null}</p>
          <p>{rating}</p>
        </div>
      </Link>
    </>
  );
}

export default Product;
