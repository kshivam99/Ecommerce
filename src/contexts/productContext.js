import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export function ProductProvider({children}) {
    const [ currentProduct, setCurrentProduct ] = useState();

    return(
        <ProductContext.Provider value={{ currentProduct, setCurrentProduct }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProduct() {
    return useContext(ProductContext);
}