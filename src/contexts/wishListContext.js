import React, { createContext, useContext, useState } from "react";

const WishListContext = createContext();

export function WishListProvider({children}) {
    const [ wishList, setWishList ] = useState([]);

    return(
        <WishListContext.Provider value={{ wishList, setWishList }}>
            {children}
        </WishListContext.Provider>
    );
}

export function useWishList() {
    return useContext(WishListContext);
}