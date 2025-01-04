import { useState } from "react";
import { Product } from "../models";
import useCustomEffect from "./useCustomEffect";
import { filterItems, sortFilters } from "../components/global/ViewProducts";

// "Best Selling",
// "Price: High - Low",
// "Price: Low - High",
// "Alphabetically: A - Z",
// "Alphabetically: Z - A"
// "Price", "Gender", "Size"

export const useSortProducts = (
  products: Product[], 
  sortValue?: string, 
  range?: {min: number, max: number},
  size?: number | string
) => {
  const [sorted, setSorted] = useState<Product[] | null>();

  const fisherYatesShuffle = (array: any[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
  }

  useCustomEffect(() => {
    if (!sortValue) return setSorted(null);
    const sortProducts = () => {
      let sortedProducts;
      switch (sortValue) {
        case sortFilters[0]:
          // best selling
          sortedProducts = fisherYatesShuffle(products);
          break;
        case sortFilters[1]:
          // price: High - Low
          sortedProducts = products.sort((a, b) => b.price - a.price);
          break;
        case sortFilters[2]:
          // price: Low - High
          sortedProducts = products.sort((a, b) => a.price - b.price);
          break;
        case sortFilters[3]:
          // A - Z
          sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
          break;
        case sortFilters[4]:
          // Z - A
          sortedProducts = products.sort((a, b) => b.name.localeCompare(a.name, "en", { sensitivity: "base" }));
          break;
        case filterItems[0]: 
          // price
          if (!range) return;
          sortedProducts = products.filter((product) => product.price >= range.min && product.price <= range.max);
          break;
        case filterItems[2]:
          // size 
          if (!size) return;
          sortedProducts = products.filter((prod) => prod.sizes.some(s => String(s) === String(size)));
          break;
        default:
          // A - Z
          sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
      }

      setSorted(sortedProducts);
    };

    sortProducts();
  }, [sortValue, range, size]);

  return { sorted };
};
