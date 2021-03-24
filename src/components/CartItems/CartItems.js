import React from 'react';
import { useCart } from "../../contexts/cartContext";
import "./CartItem.css";

function CartItem({item, cart, setCart}) {

    function incItem(){
        setCart(prev=>prev.map(curr=>
            curr.id===item.id?{...curr, quantity:curr.quantity+1}:curr))
    }

    function decItem(){
        let bool;
        cart.map(curr=>curr.id===item.id?
            (curr.quantity===1?bool=true:bool=false)
            :null);
        bool?setCart(prev=>prev.filter(curr=>curr.id!==item.id)):
        setCart(prev=>prev.map(curr=>
            curr.id===item.id?{...curr, quantity:curr.quantity-1}:curr))
    }

    return(
        <div key={item.id} className="cartItem">
            <img src={item.image} alt=""/>
            <div className="cartItemDetails">
                <h1>{item.name}</h1>
                <h4>₹{item.price}</h4>
                <button onClick={incItem}>+</button>
                <p>{item.quantity}</p>
                <button onClick={decItem}>-</button>
            </div>
        </div>
    )
}

export default function CartItems() {
    const { cart, setCart } = useCart();
    function getTotal() {
        let total=0;
        cart.map(item=>
            total+=parseInt(item.price)*parseInt(item.quantity)
            )
        return total;
    }
    return (
        <div className="cartItems">
            {cart.map(item=>
                <CartItem item={item} cart={cart} setCart={setCart} />
            )}
            <h1>Total Cart value: ₹{getTotal()}</h1>
        </div>
    );
}

