import React, { useRef } from "react";
import BigText from "./BigText";
import image1 from "../../assets/media/images/bigtext-img-1.webp";
import image2_1 from "../../assets/media/images/bigtext-img-2-1.webp";
import image2_2 from "../../assets/media/images/bigtext-img-2-2.webp";
import image3 from "../../assets/media/images/bigtext-img-3.webp";
import ProductList from "../global/ProductList";

const NewFeatured = () => {
  return (
    <div className="newfeatured-container hide-scroll">
      <div className="big-texts">
        <BigText text="Shop" image={image1} />
        <BigText text="New &" image={image2_1} objectPosition="bottom" />
        <BigText text="Featured" image={image3} />
      </div>

      <div className="products-con">
        <ProductList />
      </div>
    </div>
  );
};

export default NewFeatured;
