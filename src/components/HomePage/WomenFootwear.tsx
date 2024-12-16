import { useRef } from "react";
import ProductList from "../global/ProductList";

const WomenFootwear = () => {
  const container = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={container} className="women-footwear-container">
      <ProductList title="Women's Footwear" />
    </div>
  );
};

export default WomenFootwear;
