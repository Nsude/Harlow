import { useRef } from "react";
import ProductList from "../global/ProductList";
import useCustomEffect from "../../hooks/useCustomEffect";
import { moveSectionOnScroll } from "../utility-functions/utils";

const WomenFootwear = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useCustomEffect(() => {
    // moveSectionOnScroll(container);
  });

  return (
    <div ref={container} className="women-footwear-container">
      <ProductList title="Women's Footwear" />
    </div>
  );
};

export default WomenFootwear;
