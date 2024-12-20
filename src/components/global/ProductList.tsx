import React, { useRef, useState } from "react";
import ProductCard from "../global/ProductCard";
import prod1 from "../../assets/media/images/prod-1.webp";
import useCustomEffect from "../../hooks/useCustomEffect";
import gsap from "gsap";
import sneakers from "../../../sneakers.json";
import sweatpants from "../../../sweatpants.json";
import { Product } from "../../models";

interface Props {
  title?: string;
}

const featuredProducts = sneakers as Product[];

const ProductList: React.FC<Props> = ({ title }) => {
  const productsConRef = useRef<HTMLDivElement | null>();

  // returns the width of one carousel item to control the scroll interaction
  const getProductWidth = () => {
    const child = document.querySelector(".product-list-container .product");
    return (child?.getBoundingClientRect().width || 0) + 30;
  };

  const nextItem = () => {
    if (!productsConRef.current) return;
    const productsCon = productsConRef.current;
    productsCon.scrollBy({ left: getProductWidth(), behavior: "smooth" });
  };

  const prevItem = () => {
    if (!productsConRef.current) return;
    const productsCon = productsConRef.current;
    productsCon.scrollBy({ left: -getProductWidth(), behavior: "smooth" });
  };

  // set active carousel button based on the position of the carousel
  useCustomEffect(() => {
    if (!productsConRef.current) return;
    const productsCon = productsConRef.current;

    const handleScroll = () => {
      const rect = productsCon.getBoundingClientRect();
      const firstItem = productsCon.firstChild as HTMLDivElement;
      const lastitem = productsCon.lastChild as HTMLDivElement;
      const firstRect = firstItem.getBoundingClientRect();
      const lastRect = lastitem.getBoundingClientRect();

      const isFirst = firstRect.left === rect.left;
      const isLast = Math.floor(lastRect.left) === Math.floor(rect.left + rect.width - lastRect.width);

      gsap.to(productsCon, {
        transform: "translateX(0)",
      });

      // prev button
      gsap.to(".product-list-container .prev-btn", {
        opacity: isFirst ? 0.6 : 1,
        pointerEvents: isFirst ? "none" : "all",
      });

      // next button
      gsap.to(".product-list-container .next-btn", {
        opacity: isLast ? 0.6 : 1,
        pointerEvents: isLast ? "none" : "all",
      });
    };

    productsCon.addEventListener("scroll", handleScroll);

    return () => {
      productsCon.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="product-list-container">
      <div className="details">
        <h2>{title || "Shop Now"}</h2>
        <div className="actions flex jc-sb">
          <button className="view-all">Shop All</button>
          <div className="nav-btns">
            <button className="prev-btn" onClick={prevItem}>
              Prev
            </button>
            <span>/</span>
            <button className="next-btn" onClick={nextItem}>
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="products-frame hide-scroll">
        <div ref={(el) => (productsConRef.current = el)} className="products hide-scroll flex cg-10">
          {featuredProducts.map((item) => (
            <div key={item.id} className="product">
              <ProductCard productName={item.name} image={item.path} price={item.price} imageVariations={item.images} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
