import React, { useRef, useState } from "react";
import { Product } from "../../models";
import { useNavigate } from "react-router-dom";
import { useNavContext } from "../contexts/NavbarContext";
import useCustomEffect from "../../hooks/useCustomEffect";
import { useDevice } from "../../hooks/useDevice";

interface Props {
  image: Product;
  label?: string;
  discount?: number;
  search?: boolean; // makes product display inline
  size?: string | number;
  listView?: boolean;
}

const ProductCard: React.FC<Props> = ({ image, label = "New & Featured", discount = 33, search, size, listView }) => {
  const [displayedImage, setDisplayedImage] = useState(image.path);
  const navigate = useNavigate();
  const { setSearchOpen } = useNavContext();
  const [index, setIndex] = useState<number>();
  const device = useDevice();

  const viewProduct = (id: string) => {
    try {
      navigate(`/product-page/${id}`);
      if (!search) return;
      setSearchOpen(false);
    } catch (error) {
      console.log("Invalid product id:", error);
    }
  };

  const loopInterval = useRef<any>(null);
  const loopDisplayedImage = () => {
    loopInterval.current = setInterval(() => {
      setIndex((prev) => ((prev || 0) + 1) % image.images.length);
    }, 250);
  };

  useCustomEffect(() => {
    if (!index) return;
    setDisplayedImage(image.images[index]);
  }, [index]);

  const handleMouseLeave = (path: string) => {
    clearInterval(loopInterval.current);
    loopInterval.current = null;
    setDisplayedImage(path);
  };

  return (
    <div
      className={`product-card-container ${search && device.width < 768 ? "list-view" : ""} ${listView ? "list-view" : ""}`}
      onMouseEnter={loopDisplayedImage}
      onMouseLeave={() => handleMouseLeave(image.path)}>
      <div className="image-container" onClick={() => viewProduct(image.id)}>
        <img src={displayedImage} alt="product-image" />
      </div>
      <div className="product-details">
        <div>
          <p className="label">{label}</p>
          <div className="product-name">
            <p className="name">{image.name}</p>
            <div className="price flex cg-5">
              <p>${image.price}</p>
              <p className="discount">[ -{discount}% ]</p>
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
