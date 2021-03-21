import React from 'react';
import "./Header.css";
import { useState, useEffect } from "react";

const slider = [
    {
        id:0,
        image:"https://www.adventuregears.com/pub/media/wysiwyg/smartwave/porto/homepage/01/slider/2.jpg"
    },
    {
        id:1,
        image:"https://www.adventuregears.com/pub/media/wysiwyg/smartwave/porto/homepage/01/slider/4.jpg"
    },
    {
        id:2,
        image:"https://www.adventuregears.com/pub/media/wysiwyg/smartwave/porto/homepage/01/slider/1.jpg"
    }
]
function Header() {
    const [id, setId] = useState(0);
    const length = slider.length;


    function left() {
        console.log("left clicked")
        setId(prev=> prev===0 ? length-1: prev-1);
    };

    function right() {
        setId(prev=> prev===length-1? 0: prev+1);
    };

    function leftarrow(e) {
        if(e.key ==='ArrowLeft')
        {
            setId(prev=> prev===0 ? length-1: prev-1);
        }
    }

    function rightarrow(e) {
        if(e.key ==='ArrowRight')
        {
            setId(prev=> prev===length-1? 0: prev+1);
        }
    }
    return (
        <div className="header-body">
            {slider.map((item)=>
                <div className={item.id===id?"slide fade":"hide fade"} key={item.id}>
                    { item.id===id && <img src={item.image} alt="" />}
                    <a className="prev" onKeyPress={leftarrow}  onClick={left}>&#10094;</a>
                    <a className="next" onKeyPress={rightarrow} onClick={right}>&#10095;</a>
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
