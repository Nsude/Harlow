import { useState, useEffect } from "react";
import sneakers from "../../sneakers.json";
import sweatpants from "../../sweatpants.json";
import { Product } from "../models";
import useCustomEffect from "./useCustomEffect";


export const useSearch = (query: string) => {
  const [data, setData] = useState<Product[]>([]);
  const [moreFound, setMoreFound] = useState(false);

  useCustomEffect(() => {
    if (query.trim().length < 2) return setData([]);

    const getMatch = (dataset: Product[]) => {
      const match = dataset.filter((set) => set.name.toLowerCase().includes(query.toLowerCase()));
      
      if (!match) return [];
      return match;
    }

    // ignores spaces when checking if the query is empty
    if (query.trim() === '') {
      setData([]);
    } else {
      const sneakerMatches = getMatch(sneakers as Product[]);
      const pantMatches = getMatch(sweatpants as Product[]);
      const combinedMatches = [...sneakerMatches, ...pantMatches];
      const limitedMatches = combinedMatches.slice(0, 4);

      setData(limitedMatches);
      setMoreFound(combinedMatches.length > 4);
    }

  }, [query])

  return { data, moreFound };
}
