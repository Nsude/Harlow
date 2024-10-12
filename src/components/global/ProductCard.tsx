import React from 'react';

interface Props {
  image: string,
  label?: string,
  productName: string,
  discount?: number,
  price: string
}

const ProductCard:React.FC<Props> = ({image, label = "N & F", productName, discount = 33, price}) => {

  return (
    <div className="product-card-container">
      <div className="image-container">
        <img src={image} alt="product-image" />
      </div>
      <div className="product-details">
        <p className="label">{label}</p>
        <div className="product-name flex jc-sb">
          <p>{productName}</p>
          <div className="price flex jc-sb cg-10">
            <div className="discount">{discount}% off</div>
            <p>${price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;