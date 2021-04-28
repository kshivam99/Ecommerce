import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import { BiRupee } from "react-icons/bi";


function Product({ id, name, image, price, inStock, fastDelivery, rating }) {

  return (
    <>
      <Link className="link" to={`/product/${id}`}>
        <div
          key={id}
          className="product-card"
          style={{
            opacity:inStock?"1":"0.3"
          }}
        >
          <img src={image} />
          <h1>{name}</h1>
          <p><BiRupee color={"#000"} />{price}</p>
          <p>{inStock ? <p style={{color:"green"}}>Instock</p> : <p style={{color:"red"}}>out of stock</p>}</p>
          <p>{fastDelivery ? <span className="badge">fast delivery</span> : null}</p>
          <p>{rating}</p>
        </div>
      </Link>
    </>
  );
}

export default Product;
