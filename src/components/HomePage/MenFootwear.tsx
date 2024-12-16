import { useRef } from "react";
import ProductList from "../global/ProductList";

const MenFootwear = () => {
  const container = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={container} className="men-footwear-container">
      <ProductList title="Men's Footwear" />
    </div>
  );
};

export default MenFootwear;
