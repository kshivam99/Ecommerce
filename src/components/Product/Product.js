import React from 'react'
import "./Product.css"
import { useProduct } from "../../contexts/productContext"
import {
    Link
  } from "react-router-dom"



function Product({id, name, image, price }) {
    // const[wish, setWish] = useState(false);
    // const { cart, setCart } = useCart();
    // const { wishList, setWishList } = useWishList();
    const { setCurrentProduct } = useProduct();

    // function isWish() {
    //     let wish = false;
    //     wishList.map(item=>(
    //         item.id===id?wish=true:null
    //     ))

    //     return wish;
    // }

    // function handleWish(){
    //     if(filterItems(wishList, id).length!==0)
    //     {
    //         setWishList(prev=>prev.filter(curr=>
    //             curr.id!==id));
    //     }
    //     else{
    //         setWishList([...wishList, {id, name, image }]);
    //     }
    // }

    // function filterItems(items, id)
    // {
    //     return items.filter(curr => curr.id===id);
    // }

    // function addToCart(){
    //     if(filterItems(cart, id).length!==0)
    //     {
    //         setCart(prev=>prev.map(curr=>
    //             curr.id===id?{...curr, quantity: curr.quantity+1}:curr));
    //     }
    //     else{
    //         setCart([...cart, {id, name, image, price, quantity:1}]);
    //     }
    // }

    return (
        <>
        <Link className="link" to="/product">

        <div onClick={()=>setCurrentProduct({id, name, image, price})}className="product-card">
            <img src={image} />
            <h1>{name}</h1>
            <p>₹{price}</p>
{/*            
            <div className="card-btn">
                <div className="addToCartBtn">
                    <Link className="link" to="/cart">
                        <BiCart onClick={addToCart} />
                    </Link>
                </div>
                <div className="wish" onClick={handleWish}>
                    {!isWish()?<BsHeart />:<BsHeartFill />}
                </div>
            </div> */}
        </div>
         </Link>
         </>
    )
}

export default Product
