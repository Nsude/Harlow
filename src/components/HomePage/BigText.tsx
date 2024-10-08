import React, { useRef } from "react";
import useCustomEffect from "../../hooks/useCustomEffect";
import { gsap } from "gsap";
import placeHolderImage from "../../assets/media/images/placeholderImage.png";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  text: string;
  image?: string;
  filter?: string;
}

const BigText: React.FC<Props> = ({ text, image, filter }) => {
  const imageRef = useRef<HTMLImageElement | null>();

  useCustomEffect(() => {
    if (!imageRef.current) return;
  });

  const imageIn = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      opacity: 1,
      duration: 0,
    });

    gsap.to(imageRef.current, {
      yPercent: -100,
    });
  };

  const imageOut = () => {
    if (!imageRef.current) return;
    gsap
      .to(imageRef.current, {
        yPercent: -200,
      })
      .then(() => resetAnimations());
  };

  const resetAnimations = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      opacity: 0,
      yPercent: 100,
      duration: 0,
    });
  };

  return (
    <div className="bigtext-container hide-scroll" onMouseEnter={() => imageIn()} onMouseLeave={() => imageOut()}>
      <p> {text} </p>
      <div className="image-container">
        <img ref={(el) => (imageRef.current = el)} data-filter={filter} src={image || placeHolderImage} />
      </div>
    </div>
  );
};

export default BigText;
