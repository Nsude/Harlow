import React, { useRef } from "react";
import ButtonSolidOverlay from "./ButtonSolidOverlay";
import { useGlobalContext } from "../contexts/GlobalContex";
import useCustomEffect from "../../hooks/useCustomEffect";
import gsap from "gsap";

interface Props {
  image: string;
  title: string;
  angel?: boolean;
  buttonText?: string;
}

const FeaturedImage: React.FC<Props> = ({ image, title, angel, buttonText }) => {
  const { colors } = useGlobalContext();
  const imageRef = useRef<HTMLImageElement | null>(null);

  useCustomEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const imageAnimation = gsap.to(imageRef.current, {
      scale: 1,
      scrollTrigger: {
        scrub: 0.6,
        start: angel ? "65% 70%" : "-300 80%",
        end: "max",
      },
    });

    return () => {
      imageAnimation.kill();
      imageAnimation.scrollTrigger?.kill();
    };
  }, [angel]);

  return (
    <div className="featured-image-container" data-angel={angel}>
      <div>
        <img ref={imageRef} src={image} />
      </div>
      <h3>{title}</h3>
      {angel ? (
        <div className="cta">
          <ButtonSolidOverlay
            text={buttonText}
            bg={colors.offWhite}
            defaultColor={colors.black}
            overlay={"#EDEDED"}
            fg={colors.black}
            arrowIcon={true}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FeaturedImage;
