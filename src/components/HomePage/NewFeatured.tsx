import React, { useRef } from "react";
import BigText from "./BigText";
import ProductCard from "../global/ProductCard";
import placeHolderImage from "../../assets/media/images/placeholderImage.png";
import useCustomEffect from "../../hooks/useCustomEffect";

const NewFeatured = () => {
  const productsConRef = useRef<HTMLDivElement | null>();

  // get number of products for grid
  useCustomEffect(() => {
    if (!productsConRef.current) return;
    const products = productsConRef.current;
    products.style.setProperty("--children", `${products.children.length}`);
  }, []);

  return (
    <div className="newfeatured-container hide-scroll">
      <div className="big-texts">
        <BigText text="Shop" />
        <BigText text="New &" filter={"grayscale"} />
        <BigText text="Featured" />
      </div>

      <div className="products-con">
        <div className="control-btns flex cg-5">
          <button className="next secondary-btn">Next</button>
          <span>/</span>
          <button className="prev secondary-btn">Prev</button>
        </div>
        <div ref={(el) => (productsConRef.current = el)} className="products hide-scroll">
          <ProductCard productName="Mari Tee" image={placeHolderImage} price="52.73" />
          <ProductCard productName="Montage Tees" image={placeHolderImage} price="74.50" />
          <ProductCard productName="Cradle Hoodie" image={placeHolderImage} price="97.50" />
          <ProductCard productName="Arbeit Tees" image={placeHolderImage} price="64.50" />
          <ProductCard productName="Kandar Condour" image={placeHolderImage} price="83.50" />
          <ProductCard productName="Cradle Tees" image={placeHolderImage} price="38.50" />
          <ProductCard productName="Kandar Mari" image={placeHolderImage} price="69.50" />
        </div>
      </div>
    </div>
  );
};

export default NewFeatured;
