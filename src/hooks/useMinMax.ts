import { useState } from "react";
import { Product } from "../models";
import useCustomEffect from "./useCustomEffect";

const useMinMax = (products: Product[]) => {
  const [value, setValue] = useState<{min: number, max: number} | null>(null);

  useCustomEffect(() => {
    if (!products || products.length === 0) {
      setValue(null)
      return;
    }

    let prices = products.map((product) => product.price);

    const getMinMax = () => {
      const min = Math.min(...prices);
      const max = Math.max(...prices);

      setValue({min, max});
    }

    getMinMax();
  }, [products]);

  return {value};
}

export default useMinMax;