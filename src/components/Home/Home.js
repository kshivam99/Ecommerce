import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Product from "../Product/Product";
import Header from "../Header/Header";


export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async function getData(){ 
      const response = await axios.get("/api/products");
      setProducts(response.data.products);
    })()
  }, []);

  return (
    <>
    <div className="products">
      <div className="product-grid">
        {products.map((item) => 
              <Product id={item.id} name={item.name} image={item.image} price={item.price} />
        )}
      </div>
    </div>
    </>
  );
}
