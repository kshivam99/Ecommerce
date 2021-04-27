import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import "./Home.css";
import Product from "../Product/Product";
import { FcFilledFilter } from "react-icons/fc";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";


const ratings = {
  0: "No reviews yet",
  1: "⭐",
  2: "⭐⭐",
  3: "⭐⭐⭐",
  4: "⭐⭐⭐⭐",
  5: "⭐⭐⭐⭐⭐",
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      (async function getData() {
        setIsLoading(true);
        const response = await axios.get(
          "https://whispering-cove-66440.herokuapp.com/products"
        );
        console.log(response.data);
        setProducts(response.data);
        setIsLoading(false);
      })();
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }, []);

  const [
    { showInventoryAll, showFeaturedOnly, sortBy, maxValue },
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
            showFeaturedOnly: !state.showFeaturedOnly,
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
      showFeaturedOnly: false,
      sortBy: null,
      maxValue: 100000,
    }
  );

  function getSortedData(productList, sortBy) {
    if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
      return productList
        .slice(0)
        .sort((a, b) => b["new_price"] - a["new_price"]);
    }

    if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
      return productList
        .slice(0)
        .sort((a, b) => a["new_price"] - b["new_price"]);
    }
    return productList;
  }

  function getFilteredData(
    productList,
    { showFeaturedOnly, showInventoryAll, maxValue }
  ) {
    return productList
      .filter(({ featured }) => (showFeaturedOnly ? featured : true))
      .filter(({ stock }) => (showInventoryAll ? true : stock))
      .filter((item) => parseInt(item.new_price) <= maxValue);
  }

  const sortedData = getSortedData(products, sortBy);
  const filteredData = getFilteredData(sortedData, {
    showFeaturedOnly,
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
        <AiOutlineCloseCircle
          onClick={() => setShowFilter((prev) => !prev)}
          style={{ marginLeft: "auto" }}
        />
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
            checked={showFeaturedOnly}
            onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
          />
          <span class="checkmark"></span>
        </label>
        <div class="slidecontainer">
          <input
            type="range"
            min="50"
            max="100000"
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
        <h1>Categories</h1>
      </div>
      <div className="categories">
      <Link className="link" to={`/products/trekking`}>
        <img
          src="https://www.adventuregears.com/pub/media/wysiwyg/smartwave/porto/homepage/01/slider/cat1.jpg"
          alt=""
        />
        </Link>
        <Link className="link" to={`/products/camping`}>
        <img
          src="https://www.adventuregears.com/pub/media/wysiwyg/smartwave/porto/homepage/01/slider/cat2.jpg"
          alt=""
        />
        </Link>
        <Link className="link" to={`/products/climbing`}>
        <img
          src="https://www.adventuregears.com/pub/media/wysiwyg/smartwave/porto/homepage/01/slider/cat3.jpg"
          alt=""
        />
        </Link>
        <Link className="link" to={`/products/backpack`}>
        <img
          src="https://www.adventuregears.com/pub/media/wysiwyg/smartwave/porto/homepage/01/slider/cat4.jpg"
          alt=""
        />
        </Link>
        <Link className="link" to={`/products/shoes`}>
        <img
          src="https://www.adventuregears.com/pub/media/wysiwyg/smartwave/porto/homepage/01/slider/cat5.jpg"
          alt=""
        />
        </Link>
        <Link className="link" to={`/products/tents`}>
        <img
          src="https://www.adventuregears.com/pub/media/wysiwyg/smartwave/porto/homepage/01/slider/cat6.jpg"
          alt=""
        />
        </Link>
      </div>
      <div className="home--heading">
        <h1>Featured Products</h1>
      </div>
      <div className="products">
        <div className="product-grid">
          {isLoading ? (
            <Loader type="Oval" color="#F59E0B" height={100} width={100} />
          ) : (
            filteredData.filter(item=>item.featured).map((item) => (
              <Product
                id={item._id}
                name={item.name}
                image={item.images[0]}
                price={item.new_price}
                inStock={item.stock}
                fastDelivery={item.featured}
                rating={ratings[item.rating]}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
