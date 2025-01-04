import useCustomEffect from "./useCustomEffect";
import sneakers from "../../sneakers.json";
import sweatpants from "../../sweatpants.json";
import { useState } from "react";
import { Product } from "../models";

export const useGetProducts = (products: string) => {
  const [data, setData] = useState<Product[]>([]);

  useCustomEffect(() => {
    if (products.toLowerCase() === "sneakers") {
      setData(sneakers as Product[]);
    } else if (products.toLowerCase() === "sweatpants"){
      setData(sweatpants as Product[]);
    }
  }, [products]);

  return { data };
};
