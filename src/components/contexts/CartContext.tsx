import React, { createContext, PropsWithChildren, useContext, useState } from "react";
import { Product } from "../../models";

interface SelcectedProd {
  product: Product;
  selectedSize: string | number
}

interface Props {
  selectedProducts: SelcectedProd[];
}


const CartContext = createContext<Props | null>(null);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("Cart context is undefined");
  return context;
}

const CartProvider:React.FC<PropsWithChildren> = ({children}) => {
  const [selectedProducts, setSelectedProducts] = useState<Props | null>(null)

  return (
    <CartContext.Provider value={selectedProducts}>
      {children}
    </CartContext.Provider>
  )
}