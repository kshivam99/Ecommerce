import React from 'react'
import { useWishList } from "../../contexts/wishListContext"
import "./WishList.css"


function WishList() {
    const { wishList, setWishList } = useWishList();

    return (
        <div>
            <h1>WishList</h1>
            {wishList.map(item=>(
                <div className="wishlist-item">
                    <h1>{item.name}</h1>
                    <img src={item.image} alt="" />
                </div>
            ))}
        </div>
    )
}

export default WishList
