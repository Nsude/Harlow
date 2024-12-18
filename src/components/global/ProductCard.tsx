import React from "react";

interface Props {
  image: string;
  label?: string;
  productName: string;
  discount?: number;
  price: string | number;
}

const ProductCard: React.FC<Props> = ({ image, label = "New & Featured", productName, discount = 33, price }) => {
  return (
    <div className="product-card-container">
      <div className="image-container">
        <img src={image} alt="product-image" />
      </div>
      <div className="product-details flex fd-c">
        <p className="label">{label}</p>
        <div className="product-name">
          <p className="name">{productName}</p>
          <div className="price flex cg-5">
            <p>${price}</p>
            <p className="discount">({discount}% off)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
