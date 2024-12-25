import React, { useRef, useState } from 'react';
import { Product } from '../../models';
import { useDevice } from '../../hooks/useDevice';
import useCustomEffect from '../../hooks/useCustomEffect';

interface Props {
  product: Product
}

const ProductPageCard:React.FC<Props> = ({product}) => {
  const device = useDevice();
  const [images, setImages] = useState([product.path, ...product.images]);
  const [index, setIndex] = useState(1);
  const imagesRef = useRef<HTMLDivElement>(null);
  const [displayedImg, setDisplayedImg] = useState(product.path);

  useCustomEffect(() => {
    if (!product) return;
    setImages([product.path, ...product.images]);
  }, [product])

  useCustomEffect(() => {
    if (!imagesRef.current) return;

    const handleScroll = () => {
      const images = document.querySelectorAll('.ppc-container .ppc-m-image');
      images.forEach((image) => {
        if (!imagesRef.current) return;
        let conLeft = imagesRef.current.getBoundingClientRect().left;
        let imageX = image.getBoundingClientRect().left;
        let imageIndex = image.getAttribute('data-index');

        if (!imageIndex) return;
        conLeft === imageX ? setIndex(+imageIndex) : '';
      })

    }

    imagesRef.current.addEventListener('scroll', handleScroll);

    return () => {
      imagesRef.current?.removeEventListener('scroll', handleScroll);
    }
  })

  const updateDisplay = (image: string, e: React.MouseEvent) => {
    setDisplayedImg(image);
    const target = e.currentTarget;

    document.querySelectorAll(".ppc-container .active-box").forEach((box) => {
      box.classList.remove("active-box");
    })

    target.classList.add("active-box");
  }

  return (
    // product-page-card ppc
    <div className="ppc-container">
      {
        device.width < 1340 ? (
          <div ref={imagesRef} className="images flex cg-10 hide-scroll">
            <div className="image-count">{index} <span>/</span> {images.length}</div>
            {images.map((image, i) => (
              // product-page-card-mobile-image
              <img className='ppc-m-image' data-index={i + 1} key={i} src={image} alt='product-image' />
            ))}
          </div>
        ) : (
          <div className="image-con">
            <div className="variations flex fd-c rg-10">
              {
                images.map((image, i) => (
                  <div key={i} className="box" onMouseEnter={(e) => updateDisplay(image, e)}>
                    <img src={image} alt="product-image" />
                  </div>
                ))
              }
            </div>
            <div className="current-image">
              <img src={displayedImg} alt="Product-image" />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ProductPageCard;