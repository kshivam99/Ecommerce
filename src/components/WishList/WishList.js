import React from 'react'
import { useWishList } from "../../contexts/wishListContext"


function WishList() {
    const { wishList, setWishList } = useWishList();

    return (
        <div>
            <h1>WishList</h1>
            {wishList.map(item=>(
                <h1>{item.name}</h1>
            ))}
        </div>
    )
}

export default WishList
