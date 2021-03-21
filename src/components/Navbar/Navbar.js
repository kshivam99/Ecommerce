import React from 'react';
import "./Navbar.css";
import { FaBars, FaTimes} from 'react-icons/fa';
import { useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import {
    Link
  } from "react-router-dom";
import  { useCart }  from "../../contexts/cartContext";

function Navbar() {
    const [showDropDownNav, setShowDropDownNav] = useState(false);
    const { cart } = useCart();

    function handleMenuIconClick(){
        setShowDropDownNav(prev=>!prev);
    }

    function totalItems(){
        let total=0;
        cart.map(item=>
            total+=item.quantity);
        return total?total:null;
    }
    return (
        <div className="nav">
            <h2>Prayatak</h2>
            <ul className={!showDropDownNav?"menu":"menu active"}>
                <Link className="link" to="/">
                    <li onClick={()=>handleMenuIconClick()}>
                        Home
                    </li>
                </Link>
                <Link className="link" to="/wishlist">
                    <li onClick={()=>handleMenuIconClick()}>
                        WishList
                    </li>
                </Link>
                <Link className="link" to="/cart">
                    <li>
                        <MdShoppingBasket onClick={()=>handleMenuIconClick()} /> { cart.length?<span className="superscript">{totalItems()}</span>:null}
                    </li>
                </Link>
                
            </ul>   
            <div className="menu-icon" onClick={()=>handleMenuIconClick()}>     
                {!showDropDownNav?<FaBars />:<FaTimes />}
            </div>
        </div>
    )
}

export default Navbar
