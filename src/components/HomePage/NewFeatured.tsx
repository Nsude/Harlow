import React, { useRef } from "react";
import BigText from "./BigText";
import ProductCard from "../global/ProductCard";
import useCustomEffect from "../../hooks/useCustomEffect";
import prod1 from "../../assets/media/images/prod-1.webp";
import image1 from "../../assets/media/images/bigtext-img-1.webp";
import image2_1 from "../../assets/media/images/bigtext-img-2-1.webp";
import image2_2 from "../../assets/media/images/bigtext-img-2-2.webp";
import image3 from "../../assets/media/images/bigtext-img-3.webp";

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
        <BigText text="Shop" image={image1} />
        <BigText text="New &" image={image2_1} objectPosition="bottom" />
        <BigText text="Featured" image={image3} />
      </div>

      <div className="products-con">
        <div className="control-btns flex cg-5">
          <button className="next secondary-btn">Next</button>
          <span>/</span>
          <button className="prev secondary-btn">Prev</button>
        </div>
        <div ref={(el) => (productsConRef.current = el)} className="products hide-scroll">
          <ProductCard productName="Mari Tee" image={prod1} price="52.73" />
          <ProductCard productName="Montage Tees" image={prod1} price="74.50" />
          <ProductCard productName="Cradle Hoodie" image={prod1} price="97.50" />
          <ProductCard productName="Arbeit Tees" image={prod1} price="64.50" />
          <ProductCard productName="Kandar Condour" image={prod1} price="83.50" />
          <ProductCard productName="Cradle Tees" image={prod1} price="38.50" />
          <ProductCard productName="Kandar Mari" image={prod1} price="69.50" />
        </div>
      </div>
    </div>
  );
};

export default NewFeatured;
