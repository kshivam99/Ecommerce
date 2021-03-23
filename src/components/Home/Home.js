import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import "./Home.css";
import Product from "../Product/Product";


export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async function getData(){ 
      const response = await axios.get("/api/products");
      setProducts(response.data.products);
    })()
  }, []);

  const [
    { showInventoryAll, showFastDeliveryOnly, sortBy },
    dispatch
  ] = useReducer(
    function reducer(state, action) {
      switch (action.type) {
        case "TOGGLE_INVENTORY":
          return (state = {
            ...state,
            showInventoryAll: !state.showInventoryAll
          });

        case "TOGGLE_DELIVERY":
          return (state = {
            ...state,
            showFastDeliveryOnly: !state.showFastDeliveryOnly
          });
        case "SORT":
          return {
            ...state,
            sortBy: action.payload
          };
        default:
          return state;
      }
    },
    {
      showInventoryAll: false,
      showFastDeliveryOnly: false,
      sortBy: null
    }
  );

  function getSortedData(productList, sortBy) {
    if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
      return productList.slice(0).sort((a, b) => b["price"] - a["price"]);
    }

    if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
      return productList.slice(0).sort((a, b) => a["price"] - b["price"]);
    }
    return productList;
  }

  function getFilteredData(
    productList,
    { showFastDeliveryOnly, showInventoryAll }
  ) {
    return productList
      .filter(({ fastDelivery }) => {
        return showFastDeliveryOnly ? fastDelivery : true;
      })
      .filter(({ inStock }) => (showInventoryAll ? true : inStock));
  }

  const sortedData = getSortedData(products, sortBy);
  const filteredData = getFilteredData(sortedData, {
    showFastDeliveryOnly,
    showInventoryAll
  });

  return (
    <>
        <div className="sort">
        <fieldset>
        <legend>Sort By</legend>
        <label>
          <input
            type="radio"
            name="sort"
            onChange={() =>
              dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
            }
            checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
          ></input>{" "}
          Price - High to Low
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            onChange={() =>
              dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
            }
            checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
          ></input>{" "}
          Price - Low to High
        </label>
      </fieldset>

      <fieldset style={{ marginTop: "1rem" }}>
        <legend> Filters </legend>
        <label>
          <input
            type="checkbox"
            checked={showInventoryAll}
            onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
          />
          Include Out of Stock
        </label>

        <label>
          <input
            type="checkbox"
            checked={showFastDeliveryOnly}
            onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
          />
          Fast Delivery Only
        </label>
        {/* <label style={{ display: "block", marginTop: "1rem" }}>
          Price Range
          <input type="range" />
        </label> */}
      </fieldset>
      </div>

    <div className="products">
      <div className="product-grid">
        {filteredData.map((item) => 
             <Product id={item.id} name={item.name} image={item.image} price={item.price} inStock={item.inStock} fastDelivery={item.fastDelivery} />
        )}
      </div>
    </div>
    </>
  );
}
