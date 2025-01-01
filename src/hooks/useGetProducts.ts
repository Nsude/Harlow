import useCustomEffect from "./useCustomEffect";
import sneakers from "../../sneakers.json";
import { useState } from "react";
import { Product } from "../models";

export const useGetProducts = (products: string) => {
  const [data, setData] = useState<Product[]>([]);

  useCustomEffect(() => {
    if (products.toLowerCase() === "sneakers") {
      setData(sneakers);
    } else {
      setData([]);
    }
  }, [products]);

  return { data };
};
