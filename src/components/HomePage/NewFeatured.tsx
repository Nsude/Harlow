import React from "react";
import BigText from "./BigText";
import ProductCard from "../global/ProductCard";
import placeHolderImage from "../../assets/media/images/placeholderImage.png";

const NewFeatured = () => {
  return (
    <div className="newfeatured-container hide-scroll">
      <div className="big-texts">
        <BigText text="Shop" />
        <BigText text="New &" filter={"grayscale"} />
        <BigText text="Featured" />
      </div>

      <div className="products">
        <ProductCard productName="Mari Tee" image={placeHolderImage} price="52.73" />
      </div>
    </div>
  );
};

export default NewFeatured;
