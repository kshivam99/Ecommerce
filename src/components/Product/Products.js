import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import "./Product.css";
import Product from "./Product";

const ratings = {
  1: "⭐",
  2: "⭐⭐",
  3: "⭐⭐⭐",
  4: "⭐⭐⭐⭐",
  5: "⭐⭐⭐⭐⭐",
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [output, setOutput] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    setOutput(filteredData.filter((curr) => curr.name.toUpperCase().includes(inputText.toUpperCase())));
  }, [inputText]);

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
      <div style={{marginTop:"5rem"}} className="search--bar">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="What are you looking for?"
        />
      </div>
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
          {output.map((item) => (
            <Product
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
              inStock={item.inStock}
              fastDelivery={item.fastDelivery}
              rating={ratings[item.rating]}
            />
          ))}
          {!output.length && <h1 style={{
              color:"#D97706",
              fontSize:"2rem",
              margin:"4rem 0",
              opacity:"0.6"
          }}>Search anything you want to buy</h1>}
        </div>
      </div>
    </>
  );
}
