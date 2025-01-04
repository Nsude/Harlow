import { useRef, useState } from "react";
import { Product } from "../models";
import useCustomEffect from "./useCustomEffect";

const useMinMax = (products: Product[], productType: string) => {
  const [value, setValue] = useState<{min: number, max: number} | null>(null);
  const prices = useRef<number[]>([]);
  const ranTwice = useRef(false);

  const getMinMax = () => {
    prices.current = products.map((product) => product.price);
    if (prices.current.length === 0) return;
    let min = Math.round(Math.min(...prices.current));
    let max = Math.round(Math.max(...prices.current));

    setValue({min: Math.round(min), max: Math.round(max)});
  }

  useCustomEffect(() => {
    if (!products || products.length === 0) {
      setValue(null)
      return;
    } else if (ranTwice.current) {
      return;
    }

    getMinMax();
    ranTwice.current = true;
  }, [products])

  useCustomEffect(() => {
    getMinMax();
  }, [productType]);

  return {value};
}

export default useMinMax;