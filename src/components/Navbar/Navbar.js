import React from 'react';
import "./Navbar.css";
import { FaBars, FaTimes} from 'react-icons/fa';
import { useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import {
    Link
  } from "react-router-dom";
import  { useCart }  from "../../contexts/cartContext";
import { useWishList } from "../../contexts/wishListContext"


function Navbar() {
    const [showDropDownNav, setShowDropDownNav] = useState(false);
    const { cart } = useCart();
    const { wishList } = useWishList();


    function handleMenuIconClick(){
        setShowDropDownNav(prev=>!prev);
    }

    function totalItems(){
        let total=0;
        cart.map(item=>
            total+=item.quantity);
        return total;
    }
    return (
        <div className="nav">
            <Link className="link" to="/">
                <h2>Trekkart</h2>
            </Link>
            <ul className={!showDropDownNav?"menu":"menu active"}>
                <Link className="link" to="/">
                    <li className="middle" onClick={handleMenuIconClick}>
                        Home
                    </li>
                </Link>
                <Link className="link" to="/products">
                    <li className="middle" onClick={handleMenuIconClick}>
                        Products
                    </li>
                </Link>
                <Link className="link" to="/wishlist">
                    <li className="middle" onClick={handleMenuIconClick}>
                        WishList 
                    </li>
                    <span style={{visibility:wishList?"":"hidden"}} className="superscript">{wishList.length}</span>
                </Link>
                <Link className="link" to="/cart">
                    <li className="middle">
                        <MdShoppingBasket size={28} onClick={handleMenuIconClick} /> 
                    </li>
                    <span style={{bottom:"1rem", visibility:cart?"":"hidden"}} className="superscript">{totalItems()}</span>
                </Link>
                
            </ul>   
            <div className="menu-icon" onClick={handleMenuIconClick}>     
                {!showDropDownNav?<FaBars />:<FaTimes />}
            </div>
        </div>
    )
}

export default Navbar
