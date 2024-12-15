import React, { useRef } from "react";
import ProductList from "../global/ProductList";
import useCustomEffect from "../../hooks/useCustomEffect";
import gsap from "gsap";
import { moveSectionOnScroll } from "../utility-functions/utils";

const MenFootwear = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useCustomEffect(() => {
    moveSectionOnScroll(container);
  });

  return (
    <div ref={container} className="men-footwear-container">
      <ProductList title="Men's Footwear" />
    </div>
  );
};

export default MenFootwear;
