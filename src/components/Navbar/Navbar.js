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
        return total?total:null;
    }
    return (
        <div className="nav">
            <h2>Trekkart</h2>
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
                    { wishList.length?<span className="superscript">{wishList.length}</span>:null}
                </Link>
                <Link className="link" to="/cart">
                    <li className="middle">
                        <MdShoppingBasket size={28} onClick={handleMenuIconClick} /> 
                    </li>
                    { cart.length?<span style={{bottom:"1rem"}} className="superscript">{totalItems()}</span>:null}
                </Link>
                
            </ul>   
            <div className="menu-icon" onClick={handleMenuIconClick}>     
                {!showDropDownNav?<FaBars />:<FaTimes />}
            </div>
        </div>
    )
}

export default Navbar
