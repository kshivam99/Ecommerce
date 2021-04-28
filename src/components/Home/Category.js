import React from "react";
import { Link } from "react-router-dom";

function Featured() {
  return (
    <>
      <div className="home--heading">
        <h1>Categories</h1>
      </div>
      <div className="categories">
        <Link className="link" to={`/products/trekking`}>
          <img
            src="https://www.adventuregears.com/pub/media/wysiwyg/smartwave/porto/homepage/01/slider/cat1.jpg"
            alt=""
          />
        </Link>
        <Link className="link" to={`/products/camping`}>
          <img
            src="https://www.adventuregears.com/pub/media/wysiwyg/smartwave/porto/homepage/01/slider/cat2.jpg"
            alt=""
          />
        </Link>
        <Link className="link" to={`/products/climbing`}>
          <img
            src="https://www.adventuregears.com/pub/media/wysiwyg/smartwave/porto/homepage/01/slider/cat3.jpg"
            alt=""
          />
        </Link>
        <Link className="link" to={`/products/backpack`}>
          <img
            src="https://www.adventuregears.com/pub/media/wysiwyg/smartwave/porto/homepage/01/slider/cat4.jpg"
            alt=""
          />
        </Link>
        <Link className="link" to={`/products/shoes`}>
          <img
            src="https://www.adventuregears.com/pub/media/wysiwyg/smartwave/porto/homepage/01/slider/cat5.jpg"
            alt=""
          />
        </Link>
        <Link className="link" to={`/products/tents`}>
          <img
            src="https://www.adventuregears.com/pub/media/wysiwyg/smartwave/porto/homepage/01/slider/cat6.jpg"
            alt=""
          />
        </Link>
      </div>
    </>
  );
}

export default Featured;
