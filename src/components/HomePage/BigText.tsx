import React, { useRef, useState } from "react";
import useCustomEffect from "../../hooks/useCustomEffect";
import { gsap } from "gsap";
import placeHolderImage from "../../assets/media/images/placeholderImage.png";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  text: string;
  image?: string;
  filter?: string;
  objectPosition?: string;
}

const BigText: React.FC<Props> = ({ text, image, filter, objectPosition }) => {
  const [exit, setExit] = useState("top");
  const imageRef = useRef<HTMLImageElement | null>();

  useCustomEffect(() => {
    let prevScroll = 0;
    const handleScroll = () => {
      const scroll = document.documentElement.scrollTop;
      if (scroll > prevScroll) {
        setExit("bottom");
      } else if (scroll < prevScroll) {
        setExit("top");
      }
      prevScroll = scroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const imageIn = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      opacity: 1,
      duration: 0,
    });

    gsap.to(imageRef.current, {
      yPercent: -100,
      duration: 0.6,
    });
  };

  const imageOut = () => {
    if (!imageRef.current) return;
    gsap
      .to(imageRef.current, {
        yPercent: exit === "top" ? -200 : 0,
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
        <img
          ref={(el) => (imageRef.current = el)}
          data-filter={filter}
          src={image || placeHolderImage}
          style={{ objectPosition: objectPosition || "center" }}
        />
      </div>
    </div>
  );
};

export default BigText;
