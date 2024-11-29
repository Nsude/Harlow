import React, { useRef } from "react";
import useCustomEffect from "../../hooks/useCustomEffect";
import { gsap } from "gsap";
import sneakerImage from "../../assets/media/images/sneaker-title.webp";
import apparelImage from "../../assets/media/images/apparel-title.webp";
import accessImage from "../../assets/media/images/access-title.webp";

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
          <img ref={(el) => imagesToAnim.current.push(el)} src={sneakerImage} />
          <h3>Sneakers</h3>
        </div>
        <div className="featured">
          <img ref={(el) => imagesToAnim.current.push(el)} src={apparelImage} />
          <h3>Apparel</h3>
        </div>
        <div className="featured">
          <img ref={(el) => imagesToAnim.current.push(el)} src={accessImage} />
          <h3>Accessories</h3>
        </div>
      </div>
    </div>
  );
};

export default Featured;
