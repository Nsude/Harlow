import React, { useState } from "react";
import { Product } from "../../models";
import { useNavigate } from "react-router-dom";
import { useNavContext } from "../contexts/NavbarContext";

interface Props {
  image: Product;
  label?: string;
  discount?: number;
  search?: boolean; // makes product display inline
  size?: string | number;
  cartPreview?: boolean;
  listView?: boolean;
}

const ProductCard: React.FC<Props> = ({
  image,
  label = "New & Featured",
  discount = 33,
  search,
  size,
  cartPreview,
  listView,
}) => {
  const [displayedImage, setDisplayedImage] = useState(image.path);
  const navigate = useNavigate();
  const { setSearchOpen } = useNavContext();

  const viewProduct = (id: string) => {
    try {
      navigate(`/product-page/${id}`);
      if (!search) return;
      setSearchOpen(false);
    } catch (error) {
      console.log("Invalid product id:", error);
    }
  };

  return (
    <div
      className={`product-card-container ${search ? "search" : ""} ${cartPreview ? "cart" : ""} ${listView ? "list-view" : ""}`}
      onMouseLeave={() => setDisplayedImage(image.path)}>
      <div className="image-container" onClick={() => viewProduct(image.id)}>
        <img src={displayedImage} alt="product-image" />
      </div>
      <div className="product-details flex fd-c">
        <div className="image-variations flex cg-5">
          {Array.isArray(image.images) &&
            image.images.slice(0, 4).map((image, i) => (
              <button key={i} className="variation-con" onMouseEnter={() => setDisplayedImage(image)}>
                <img src={image} alt="product-image-variation" />
              </button>
            ))}
        </div>
        <div>
          <p className="label">{label}</p>
          <div className="product-name">
            <p className="name">{image.name}</p>
            <div className="price flex cg-5">
              <p>${image.price}</p>
              <p className="discount">({discount}% off)</p>
            </div>
            {size && (
              <button className="size flex">
                <p>Size &nbsp;</p>
                <span>{size}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
