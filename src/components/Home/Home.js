import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import "./Home.css";
import Product from "../Product/Product";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async function getData() {
      const response = await axios.get("/api/products");
      setProducts(response.data.products);
    })();
  }, []);

  const [
    { showInventoryAll, showFastDeliveryOnly, sortBy, maxValue },
    dispatch,
  ] = useReducer(
    function reducer(state, action) {
      switch (action.type) {
        case "TOGGLE_INVENTORY":
          return (state = {
            ...state,
            showInventoryAll: !state.showInventoryAll,
          });

        case "TOGGLE_DELIVERY":
          return (state = {
            ...state,
            showFastDeliveryOnly: !state.showFastDeliveryOnly,
          });
        case "SORT":
          return {
            ...state,
            sortBy: action.payload,
          };
        case "TOGGLE_PRICE_RANGE":
          return {
            ...state,
            maxValue: action.payload,
          };
        default:
          return state;
      }
    },
    {
      showInventoryAll: false,
      showFastDeliveryOnly: false,
      sortBy: null,
      maxValue: 1000,
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
    { showFastDeliveryOnly, showInventoryAll, maxValue }
  ) {
    return productList
      .filter(({ fastDelivery }) =>
        showFastDeliveryOnly ? fastDelivery : true
      )
      .filter(({ inStock }) => (showInventoryAll ? true : inStock))
      .filter((item) => parseInt(item.price) <= maxValue);
  }

  const sortedData = getSortedData(products, sortBy);
  const filteredData = getFilteredData(sortedData, {
    showFastDeliveryOnly,
    showInventoryAll,
    maxValue,
  });

  return (
    <>
      <div className="sort">
        <div className="select-sort">
          <label for="sort">Sort By:</label>
          <select
            onChange={(e) =>
              dispatch({ type: "SORT", payload: e.target.value })
            }
            name="sort"
            id="sort"
          >
            <option value="">Newest First</option>
            <option value="PRICE_HIGH_TO_LOW">Price high to low</option>
            <option value="PRICE_LOW_TO_HIGH">Price low to high</option>
          </select>
        </div>

        {/* 
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
        </fieldset> */}
        <div className="select-sort">
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
        </div>
        <div className="select-sort">
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={maxValue}
            onChange={(e) => {
              dispatch({ type: "TOGGLE_PRICE_RANGE", payload: e.target.value });
            }}
          />
          <label for="price">₹{maxValue}</label>
        </div>
      </div>

      <div className="products">
        <div className="product-grid">
          {filteredData.map((item) => (
            <Product
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
              inStock={item.inStock}
              fastDelivery={item.fastDelivery}
            />
          ))}
        </div>
      </div>
    </>
  );
}
