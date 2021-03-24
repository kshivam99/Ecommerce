import React from 'react'
import { useWishList } from "../../contexts/wishListContext"
import "./WishList.css"
import  { useCart }  from "../../contexts/cartContext";



function WishList() {
    const { wishList, setWishList } = useWishList();
    const { cart, setCart } = useCart();

    function removeWish(id) {
        setWishList(prev=>prev.filter(curr=>
            curr.id!==id));
    }

    function filterItems(items, id)
    {
        return items.filter(curr => curr.id===id);
    }

    function addToCart(item){
        if(filterItems(cart, item.id).length!==0)
        {
            setCart(prev=>prev.map(curr=>
                curr.id===item.id?{...curr, quantity: curr.quantity+1}:curr));
        }
        else{
            setCart([...cart, {id:item.id, name:item.name, image:item.image, price:item.price, quantity:1}]);
        }
    }

    return (
        <div>
            <h1>WishList</h1>
            {wishList.map(item=>(
                <div className="wishlist-item">
                    <h1>{item.name}</h1>
                    <img src={item.image} alt="" />
                    <button onClick={()=>removeWish(item.id)}>Remove</button>
                    <button onClick={()=>addToCart(item)}>Buy Now</button>
                </div>
            ))}
        </div>
    )
}

export default WishList
