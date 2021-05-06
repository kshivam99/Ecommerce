import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import "./Home.css";
import Product from "../Product/Product";
import Category from "./Category";
import Loader from "react-loader-spinner";
import Filter from "./Filter";



export default function Home() {
  const [products, setProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      (async function getData() {
        setIsLoading(true);
        const response = await axios.get(
          "https://protected-bastion-58177.herokuapp.com/products"
        );
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
      <Category />
      <Filter showFilter={showFilter} setShowFilter={setShowFilter} dispatch={dispatch} showInventoryAll={showInventoryAll} showFeaturedOnly={showFeaturedOnly} maxValue={maxValue} />
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
                o_price={item.old_price}
                inStock={item.stock}
                fastDelivery={item.featured}
                rating={item.rating}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
