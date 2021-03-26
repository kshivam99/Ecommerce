import React from 'react';
import "./Header.css";
import { useState, useEffect } from "react";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./4.jpg";


const slider = [
    {
        id:0,
        image:img1
    },
    {
        id:1,
        image:img2
    },
    {
        id:2,
        image:img3
    }
]
function Header() {
    const [id, setId] = useState(0);
    const length = slider.length;

    // useEffect(() => {
    //     console.log("hi");
    //     const timer = setInterval(() => {
    //      setId(prev=> prev===length-1? 0: prev+1);
    //     }, 4000);
    //     return () => {
    //       clearInterval(timer);
    //     };
    //   }, []);


    function left() {
        console.log("left clicked")
        setId(prev=> prev===0 ? length-1: prev-1);
    };

    function right() {
        setId(prev=> prev===length-1? 0: prev+1);
    };
    
    return (
        <div className="header-body">
            {slider.map((item)=>
                <div className={item.id===id?"slide":""} key={item.id}>
                    { item.id===id && <img src={item.image} alt="" />}
                    <a className={item.id===id?" prev":"hide"} onClick={left} tabIndex="0">&#10094;</a>
                    <a className={item.id===id?" next":"hide"} onClick={right} tabIndex="0">&#10095;</a>
                </div>
             )}
                        
            <div style={{textAlign:"center"}}>
                <span className={id===0?"active dot":"dot"} onClick={()=>setId(0)}></span> 
                <span className={id===1?"active dot":"dot"} onClick={()=>setId(1)}></span> 
                <span className={id===2?"active dot":"dot"} onClick={()=>setId(2)}></span> 
            </div>
        </div>
    )
}

export default Header
