import React from 'react';
import { useCart } from "../../contexts/cartContext";
import "./CartItem.css";

function CartItem({item}) {
    return(
        <div key={item.id} className="cartItem">
            <img src={item.image} alt=""/>
            <div className="cartItemDetails">
                <h1>{item.name}</h1>
                <h4>{item.price}</h4>
                {item.quantity}
            </div>
        </div>
    )
}

export default function CartItems() {
    const { cart, setCart } = useCart();
    return (
        <div className="cartItems">
            {cart.map(item=>
                <CartItem item={item} />
            )}
        </div>
    );
}

