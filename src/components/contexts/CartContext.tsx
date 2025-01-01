import React, { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "../../models";
import useCustomEffect from "../../hooks/useCustomEffect";

interface SelcectedProd {
  product: Product;
  selectedSize: string | number;
  orderCount: number;
}

interface Props {
  selectedProducts: SelcectedProd[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<SelcectedProd[]>>;
  addToCart: (product: Product, selectedSize: string | number) => void;
  removeFromCart: (id: string) => void;
  openCart: boolean;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
  toPreview: { product: Product; selectedSize: string | number } | null;
  setToPreview: React.Dispatch<React.SetStateAction<{ product: Product; selectedSize: string | number } | null>>;
}

const CartContext = createContext<Props | null>(null);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("Cart context is undefined");
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState<SelcectedProd[]>([]);
  const [openCart, setOpenCart] = useState(false);
  const [toPreview, setToPreview] = useState<{ product: Product; selectedSize: string | number } | null>(null);

  // update cart locally and in local storage
  const addToCart = (product: Product, selectedSize: string | number) => {
    setToPreview({ product, selectedSize });

    setSelectedProducts((prev) => {
      const updatedProducts = (() => {
        const alreadyExists = prev.find((item) => item.product.id === product.id);
        if (alreadyExists) {
          return prev.map((item) =>
            item.product.id === product.id ? { ...item, selectedSize, orderCount: item.orderCount + 1 } : item
          );
        }

        return [...prev, { product, selectedSize, orderCount: 1 }];
      })();

      localStorage.setItem("selectedProducts", JSON.stringify(updatedProducts));

      return updatedProducts;
    });
  };

  const removeFromCart = (id: string) => {
    const toDelete = selectedProducts.find(({ product }) => product.id === id);
    if (!toDelete) return;
    // reduce order count
    if (toDelete.orderCount > 1) {
      setSelectedProducts((prev) => {
        return prev.map((item) =>
          item.product.id === toDelete.product.id ? { ...item, orderCount: item.orderCount - 1 } : item
        );
      });

      return;
    }

    // return an array of all items that do not match the toDelete id
    const updatedList = selectedProducts.filter(({ product }) => product.id !== id);
    setSelectedProducts(updatedList);

    localStorage.setItem("selectedProducts", JSON.stringify(updatedList));
  };

  useCustomEffect(() => {
    const stored = localStorage.getItem("selectedProducts");
    if (!stored) return;
    const storedProducts = JSON.parse(stored);
    if (!storedProducts) return;
    setSelectedProducts(storedProducts);
  }, []);

  return (
    <CartContext.Provider
      value={{
        selectedProducts,
        setSelectedProducts,
        addToCart,
        removeFromCart,
        openCart,
        setOpenCart,
        toPreview,
        setToPreview,
      }}>
      {children}
    </CartContext.Provider>
  );
};
