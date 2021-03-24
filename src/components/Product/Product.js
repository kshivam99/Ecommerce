import React from 'react'
import "./Product.css"
import { useProduct } from "../../contexts/productContext"
import {
    Link
  } from "react-router-dom"



function Product({id, name, image, price, inStock, fastDelivery }) {
    const { setCurrentProduct } = useProduct();
    
    return (
        <>
        <Link className="link" to="/product">
            <div onClick={()=>setCurrentProduct({id, name, image, price, inStock, fastDelivery })}              className="product-card">
                <img src={image} />
                <h1>{name}</h1>
                <p>₹{price}</p>
                <p>Instock {inStock?"Available":"out of stock"}</p>
            <p>fast Delivery {fastDelivery?"Available":"Nope"}</p>
            </div>
         </Link>
         </>
    )
}

export default Product
