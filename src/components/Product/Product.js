import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";



function Product({ id, name, image, price, o_price, inStock, fastDelivery, rating }) {

  return (
    <>
      <Link className="link" to={`/product/${id}`}>
      <div key={id} className="card1--body">
          <img
            src={image}
            alt=""
          />
          <div className="badge">{fastDelivery ?"fast delivery": null}</div>
          <div className="rating--row">
            {[...Array(rating)].map((i) => (
              <AiFillStar color={"#D97706"} size={24} />
            ))}
          </div>
          <div className="card--details">
            <h4>{name}</h4>
            <div className="price--row">
              <h5 className="new__price">
                <BiRupee />
                {price}
              </h5>
              <h5 className="old__price">
                <BiRupee />
                {o_price}
              </h5>
            </div>
            <h5 className="offer">16% OFF</h5>
          </div>
          {!inStock && <div className="overlay">
            <h2>Out of Stock</h2>
          </div>}
        </div>
      </Link>
    </>
  );
}

export default Product;
