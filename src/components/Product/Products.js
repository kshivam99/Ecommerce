import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import "./Product.css";
import Product from "./Product";
import { FcFilledFilter } from "react-icons/fc";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";


const ratings = {
  0: "No reviews yet",
  1: "⭐",
  2: "⭐⭐",
  3: "⭐⭐⭐",
  4: "⭐⭐⭐⭐",
  5: "⭐⭐⭐⭐⭐",
};

function SearchBar({inputText, setInputText }){
  return(
    <>
    <div className="search--bar">
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="What are you looking for?"
      />
    </div>
    </>
  )
}

function RenderProducts({inputText, output, filteredData}) {
  return(
    <>
    {inputText.length
          ? output.map((item) => (
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
          : filteredData.map((item) => (
              <Product
                id={item._id}
                name={item.name}
                image={item.images[0]}
                price={item.new_price}
                inStock={item.stock}
                fastDelivery={item.featured}
                rating={ratings[item.rating]}
              />
            ))}
        {!output.length && inputText && (
          <h1
            style={{
              color: "#D97706",
              fontSize: "2rem",
              margin: "4rem 0",
              opacity: "0.6",
            }}
          >
            Sorry {inputText} is not available
          </h1>
        )}
    </>
  )
}

function ProductsGrid({isLoading, inputText, output, filteredData}) {
  return(
    <>
    <div className="products">
      <div className="product-grid">
        {isLoading?
        <Loader type="TailSpin" color="#F59E0B" height={100} width={100} />
        :
        <RenderProducts inputText={inputText} output={output} filteredData={filteredData} />
        }
      </div>
    </div>
    </>
  )
}

export default function Products() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [output, setOutput] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function checkAvailable(db, item) {
    let pat = item.trim();
    return db.toUpperCase().includes(pat.toUpperCase());
  }

  useEffect(() => {
    setOutput(
      filteredData.filter((curr) => checkAvailable(curr.name, inputText))
    );
  }, [inputText]);

  useEffect(() => {
    try {
      (async function getData() {
        setIsLoading(true);
        const response = await axios.get(
          "https://protected-bastion-58177.herokuapp.com/products"
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
      .filter(item=>category!=="all"?item.category===category:true)
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


  function SortFilter(){
      return(
        <>
        <div className="sort--filter">
        <FcFilledFilter
          onClick={() => setShowFilter((prev) => !prev)}
          size={32}
          className="filter--icon"
        />
      </div>
      <div
        style={{ display: showFilter ? "" : "none" }}
        className="filter--Productsmodal"
      >
        <AiOutlineCloseCircle
          onClick={() => setShowFilter((prev) => !prev)}
          style={{ marginLeft: "auto" }}
        />
        <label htmlFor="sort">Sort By:</label>
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
        </>
      )
  }


  return (
    <div className="container--body">
      <SearchBar inputText={inputText} setInputText={setInputText} />
      <SortFilter />
      <ProductsGrid isLoading={isLoading} inputText={inputText} output={output} filteredData={filteredData} />
    </div>
  );
}
