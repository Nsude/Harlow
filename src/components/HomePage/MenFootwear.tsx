import React, { useRef } from "react";
import ProductList from "../global/ProductList";
import useCustomEffect from "../../hooks/useCustomEffect";
import gsap from "gsap";

const MenFootwear = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useCustomEffect(() => {
    if (window.innerWidth < 1340 || !container.current) return null;

    gsap.to(container.current, {
      yPercent: -95,
      scrollTrigger: {
        trigger: ".image-section-container",
        scrub: 1,
        start: "top 0%",
      },
    });
  });

  return (
    <div ref={container} className="men-footwear-container">
      <ProductList title="Men's Footwear" />
    </div>
  );
};

export default MenFootwear;
