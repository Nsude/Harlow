import { useState } from "react"
import useCustomEffect from "./useCustomEffect"
import { Product } from "../models";
import sneakers from "../../sneakers.json";
import sweatpants from "../../sweatpants.json";

export const useSelectedProduct = (id: string) => {
  const [selectedProd, setSelectedProd] = useState<Product | null>(null);
  const products = [...sneakers, ...sweatpants]

  useCustomEffect(() => {
    const getProduct = () => {
      const match = products.find((product) => product.id === id);
      setSelectedProd(match || null);
    }

    getProduct();

  }, [id])

  return { selectedProd };

}