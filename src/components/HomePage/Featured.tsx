import React, { useRef } from "react";
import placeHolderImage from "../../assets/media/images/placeholderImage.png";
import useCustomEffect from "../../hooks/useCustomEffect";
import { gsap } from "gsap";

const Featured = () => {
  const imagesToAnim = useRef<(HTMLImageElement | null)[]>([]);

  useCustomEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(imagesToAnim.current, {
      scale: 1,
      scrollTrigger: {
        trigger: ".images",
        scrub: 0.6,
        start: "-300 80%",
        end: "max",
      },
    });
  }, []);

  return (
    <div className="featured-container">
      <h2 className="title">Featured</h2>
      <div className="images hide-scroll">
        <div className="featured">
          <img ref={(el) => imagesToAnim.current.push(el)} src={placeHolderImage} />
          <h3>Sneakers</h3>
        </div>
        <div className="featured">
          <img ref={(el) => imagesToAnim.current.push(el)} src={placeHolderImage} />
          <h3>Apparel</h3>
        </div>
        <div className="featured">
          <img ref={(el) => imagesToAnim.current.push(el)} src={placeHolderImage} />
          <h3>Accessories</h3>
        </div>
      </div>
    </div>
  );
};

export default Featured;
