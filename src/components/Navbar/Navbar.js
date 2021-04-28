import React from "react";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/cartContext";
import { useWishList } from "../../contexts/wishListContext";
import { useAuth } from "../../contexts/authContext";

function Navbar() {
  const { auth, setAuth } = useAuth();
  const [showDropDownNav, setShowDropDownNav] = useState(false);
  const { cart, setCart } = useCart();
  const { wishList, setWishList } = useWishList();

  function handleMenuIconClick() {
    setShowDropDownNav((prev) => !prev);
  }

  function totalItems() {
    let total = 0;
    cart.map((item) => (total += item.quantity));
    return total;
  }

  function handleLogout() {
    setAuth(null);
    setCart([]);
    setWishList([]);
    localStorage.clear();
  }

  return (
    <div className="nav">
      <Link className="link" to="/">
        <h2>Trekkart</h2>
      </Link>
      <ul className={!showDropDownNav ? "menu" : "menu active"}>
      <Link className="link" to="/login">
          <li className="middle" onClick={handleMenuIconClick}>
            {!auth && "Sign In"}
          </li>
        </Link>
        <li className="middle" style={{display:auth?"":"none"}} onClick={handleMenuIconClick}>
            {auth && `Hi, ${auth.user.name}`}
          </li>
          <li className="middle" style={{display:auth?"":"none"}} onClick={()=>{
            handleLogout()
            handleMenuIconClick()}}>
            {auth && `Sign Out`}
          </li>
        <Link className="link" to="/products/all">
          <li className="middle" onClick={handleMenuIconClick}>
            Products
          </li>
        </Link>
        <Link className="link" to="/wishlist">
          {auth && (
            <>
              <li className="middle" onClick={handleMenuIconClick}>
                WishList
              </li>
              <span
                style={{ visibility: wishList ? "" : "hidden" }}
                className="superscript"
              >
                {wishList.length}
              </span>
            </>
          )}
        </Link>
        <Link className="link" to="/cart">
          <li className="middle">
            <MdShoppingBasket size={28} onClick={handleMenuIconClick} />
          </li>
          <span
            style={{ bottom: "1rem", visibility: cart ? "" : "hidden" }}
            className="superscript"
          >
            {totalItems()}
          </span>
        </Link>
      </ul>
      <div className="menu-icon" onClick={handleMenuIconClick}>
        {!showDropDownNav ? <FaBars /> : <FaTimes />}
      </div>
    </div>
  );
}

export default Navbar;
