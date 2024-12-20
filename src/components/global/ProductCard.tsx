import React, { useState } from "react";

interface Props {
  image: string;
  label?: string;
  productName: string;
  discount?: number;
  price: string | number;
  search?: boolean;
  imageVariations: string[];
}

const ProductCard: React.FC<Props> = ({ 
  image, 
  label = "New & Featured", 
  productName, 
  discount = 33, 
  search, 
  price,  
  imageVariations
  }) => {
    const [displayedImage, setDisplayedImage] = useState(image);

  return (
    <div className={`product-card-container ${search ? 'search' : ''}`} onMouseLeave={() => setDisplayedImage(image)}>
      <div className="image-container">
        <img src={displayedImage} alt="product-image" />
      </div>
      <div className="product-details flex fd-c">
        <div className="image-variations flex cg-5">
          { Array.isArray(imageVariations) &&
            imageVariations.slice(0, 4).map((image) => (
              <button className="variation-con" onMouseEnter={() => setDisplayedImage(image)}>
                <img src={image} alt="product-image-variation" />
              </button>
            ))
          }
        </div>
        <div>
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
    </div>
  );
};

export default ProductCard;
