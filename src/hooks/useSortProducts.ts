import { useState } from "react";
import { Product } from "../models";
import useCustomEffect from "./useCustomEffect";
import { sortFilters } from "../components/global/ViewProducts";

// "Best Selling",
// "Price: High - Low",
// "Price: Low - High",
// "Alphabetically: A - Z",
// "Alphabetically: Z - A"

export const useSortProducts = (products: Product[], sortValue: string) => {
  const [sorted, setSorted] = useState<Product[] | null>();

  useCustomEffect(() => {
    if (!sortValue) return setSorted(null);
    const sortProducts = () => {
      let sortedProducts;
      switch (sortValue) {
        case sortFilters[0]:
          // best selling
          sortedProducts = products.sort((a, b) => b.price - a.price);
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
        default:
          // A - Z
          sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
      }

      setSorted(sortedProducts);
    };

    sortProducts();
  }, [sortValue]);

  return { sorted };
};
