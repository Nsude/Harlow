import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelectedProduct } from "../../hooks/useSelectedProduct";
import ButtonSolidOverlay from "./ButtonSolidOverlay";
import ProductSizes from "./ProductSizes";
import { useGlobalContext } from "../contexts/GlobalContex";
import ProductPageCard from "./ProductPageCard";
import { Product } from "../../models";
import placeholder from "../../assets/media/images/placeholderImage.png";
import { useCartContext } from "../contexts/CartContext";
import ProductCard from "./ProductCard";

const buttonStyles = {width: "100%", display: "flex", justifyContent: "center", paddingBlock: "22px"};

const ProductPage = () => {
  const { id } = useParams();
  const { selectedProd: product } = useSelectedProduct(id || "");
  const { colors } = useGlobalContext();
  const [selectedSize, setSelectedSize] = useState<string | number>("");
  const { addToCart } = useCartContext();

  const updateCart = (product: Product) => {
    addToCart(product, selectedSize);
  };

  return (
    <>
      {product ? (
        <div className="product-page-container">
          <div className="image-con">
            <ProductPageCard product={product} />
          </div>
          <div className="details">
            <div className="header">
              <h2>{product.name}</h2>
              <p>$ {product.price}</p>
            </div>
            <div className="desc">
              <p>{product.description}</p>
            </div>
            <div className="sizes">
              <h4>Available Sizes</h4>
              <ProductSizes selectedSize={selectedSize} sizes={product.sizes} setSelctedSize={setSelectedSize} />
            </div>
            <div className="cta flex fd-c rg-10">
              <ButtonSolidOverlay
                text="Buy Now"
                disable={!selectedSize ? true : false}
                fg={colors.offWhite}
                overlay={colors.black}
                defaultColor={colors.offWhite}
                arrowIcon={true}
                bg={colors.black}
                otherStyles={buttonStyles}
              />

              <ButtonSolidOverlay
                text="Add to Cart"
                defaultColor={colors.black}
                disable={!selectedSize ? true : false}
                bg={colors.gray}
                fg={colors.offWhite}
                otherStyles={buttonStyles}
                handleClick={() => updateCart(product)}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductPage;
