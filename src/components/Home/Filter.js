import React from "react";
import { FcFilledFilter } from "react-icons/fc";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Filter({ showFilter, setShowFilter, dispatch, showInventoryAll, showFeaturedOnly, maxValue}) {
  return (
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
          <span className="checkmark"></span>
        </label>
        <div className="slidecontainer">
          <input
            type="range"
            min="1000"
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
  );
}

export default Filter;
