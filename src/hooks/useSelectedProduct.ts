import { useEffect, useState } from "react"
import useCustomEffect from "./useCustomEffect"
import { Product } from "../models";
import sneakers from "../../sneakers.json";
import sweatpants from "../../sweatpants.json";

export const useSelectedProduct = (id: string) => {
  const [selectedProd, setSelectedProd] = useState<Product>();
  const products = [...sneakers, ...sweatpants]

  useEffect(() => {
    const getProduct = () => {
      const match = products.find((product) => product.id === id) as Product;
      if (!match) return;
      setSelectedProd(match);
    }

    getProduct();

  }, [id])

  return { selectedProd };

}