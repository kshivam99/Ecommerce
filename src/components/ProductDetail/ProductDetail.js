import React, { useReducer } from 'react'
import { useCart } from "../../contexts/cartContext"
import { useWishList } from "../../contexts/wishListContext"
import {
    Link
  } from "react-router-dom"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { BiCart } from "react-icons/bi"
import { useProduct } from "../../contexts/productContext"
import "./ProductDetail.css"




function ProductDetail() {
    const { currentProduct:{id, name, image, price, inStock, fastDelivery } } = useProduct();
    const { cart, setCart } = useCart();
    const { wishList, setWishList } = useWishList();

    function isWish() {
        let wish = false;
        wishList.map(item=>(
            item.id===id?wish=true:null
        ))
        return wish;
    }

    function handleWish(){
        if(filterItems(wishList, id).length!==0)
        {
            setWishList(prev=>prev.filter(curr=>
                curr.id!==id));
        }
        else{
            setWishList([...wishList, {id, name, image }]);
        }
    }

    function filterItems(items, id)
    {
        return items.filter(curr => curr.id===id);
    }

    function addToCart(){
        if(filterItems(cart, id).length!==0)
        {
            setCart(prev=>prev.map(curr=>
                curr.id===id?{...curr, quantity: curr.quantity+1}:curr));
        }
        else{
            setCart([...cart, {id, name, image, price, quantity:1}]);
        }
    }

    return (
        <div className="product--detail">
            <img src={image} />
            <h1>{name}</h1>
            <p>₹{price}</p>
            <p>Instock {inStock?"Available":"out of stock"}</p>
            <p>fast Delivery {fastDelivery?"Available":"Nope"}</p>

            <div className="card-btn">
                <div className="addToCartBtn">
                    <Link className="link" to="/cart">
                        <BiCart onClick={addToCart} />
                    </Link>
                </div>
                <div className="wish" onClick={handleWish}>
                    {!isWish()?<BsHeart />:<BsHeartFill />}
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
