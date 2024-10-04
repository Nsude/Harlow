import React, { useEffect, useRef } from "react";
import placeHolderImage from "../../assets/media/images/placeholderImage.png";

const Featured = () => {
  const containerRef = useRef<HTMLDivElement | null>();
  const imagesRef = useRef<HTMLDivElement | null>();

  return (
    <div className="featured-container">
      <h2 className="title">Featured</h2>
      <div className="images hide-scroll">
        <div className="featured">
          <img src={placeHolderImage} />
          <p>Sneakers</p>
        </div>
        <div className="featured">
          <img src={placeHolderImage} />
          <p>Apparel</p>
        </div>
        <div className="featured">
          <img src={placeHolderImage} />
          <p>Accessories</p>
        </div>
      </div>
    </div>
  );
};

export default Featured;
