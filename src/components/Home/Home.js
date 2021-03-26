import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import "./Home.css";
import Product from "../Product/Product";
import { FcFilledFilter } from "react-icons/fc";

const ratings = {
  1: "⭐",
  2: "⭐⭐",
  3: "⭐⭐⭐",
  4: "⭐⭐⭐⭐",
  5: "⭐⭐⭐⭐⭐",
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

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
    <div className="container--body">
      <div className="sort--filter">
        <FcFilledFilter
          onClick={() => setShowFilter((prev) => !prev)}
          size={32}
          className="filter--icon"
        />
      </div>
      <div
        style={{ display: showFilter ? "" : "none" }}
        className="filter--modal"
      >
        <span
          onClick={() => setShowFilter((prev) => !prev)}
          style={{ marginLeft: "auto" }}
        >
          X
        </span>
        <p>Sort By:</p>
        <select
          onChange={(e) => dispatch({ type: "SORT", payload: e.target.value })}
          name="sort"
          id="sort"
        >
          <option value="">Newest First</option>
          <option value="PRICE_HIGH_TO_LOW">Price high to low</option>
          <option value="PRICE_LOW_TO_HIGH">Price low to high</option>
        </select>
        <label class="container">
          Include Out of Stock
          <input
            type="checkbox"
            checked={showInventoryAll}
            onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
          />
          <span class="checkmark"></span>
        </label>
        <label class="container">
          Fast Delivery Only
          <input
            type="checkbox"
            checked={showFastDeliveryOnly}
            onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
          />
          <span class="checkmark"></span>
        </label>
        <div class="slidecontainer">
          <input
            type="range"
            min="50"
            max="1000"
            value={maxValue}
            class="slider"
            id="myRange"
            onChange={(e) => {
              dispatch({
                type: "TOGGLE_PRICE_RANGE",
                payload: e.target.value,
              });
            }}
          />
          <p>
            Value: <span id="demo">₹{maxValue}</span>
          </p>
        </div>
      </div>
      <div className="home--heading">
        <h1>Featured Products</h1>
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
              rating={ratings[item.rating]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
