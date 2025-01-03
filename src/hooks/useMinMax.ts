import { useRef, useState } from "react";
import { Product } from "../models";
import useCustomEffect from "./useCustomEffect";

const useMinMax = (products: Product[], productType: string) => {
  const [value, setValue] = useState<{min: number, max: number} | null>(null);
  const prices = useRef<number[]>([]);
  const ranTwice = useRef(0);

  const getMinMax = () => {
    prices.current = products.map((product) => product.price);
    /* YES JOE, I KNOW I CAN USE THE MATH MIN MAX METHODS 🙂 */ 
    let arr = prices.current
    if (arr.length === 0 ) {
      return setValue({min: 0, max: 0});
    }

    let min = arr[0];
    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
      // get min
      if (arr[i] < min) {
        min = arr[i];
      }

      // get max
      if (arr[i] > max) {
        max = arr[i]
      }
    }

    setValue({min, max});
  }

  useCustomEffect(() => {
    if (!products || products.length === 0) {
      setValue(null)
      return;
    } else if (ranTwice.current === 2) {
      return;
    }

    getMinMax();
    ranTwice.current ++;
  }, [products])

  useCustomEffect(() => {
    getMinMax();
  }, [productType]);

  return {value};
}

export default useMinMax;