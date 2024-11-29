import { useRef, useState } from "react";
import LinkArrowIcon from "../../assets/icons/LinkArrowIcon";
import { useGlobalContext } from "../contexts/GlobalContex";
import useCustomEffect from "../../hooks/useCustomEffect";
import useMousePos from "../../hooks/useMousePos";
import { gsap } from "gsap";
import { scrambleText } from "../utility-functions/scrambleText";
import image1 from "../../assets/media/images/showcase-1.webp";
import image2 from "../../assets/media/images/showcase-2.webp";
import ButtonSolidOverlay from "../global/ButtonSolidOverlay";

const ShowcaseArea = () => {
  const { colors } = useGlobalContext();
  const [arrowColor, setArrowColor] = useState(colors.black);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // button interactions
  useCustomEffect(() => {
    const handleMouseEnter = () => setArrowColor(colors.offWhite);
    const handleMouseLeave = () => setArrowColor(colors.black);

    buttonsRef.current.forEach((button) => {
      if (!button) return;
      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      buttonsRef.current.forEach((button) => {
        if (!button) return;
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // image mask
  const [imageMask, setImageMask] = useState<Element | null>();
  const mousePos = useMousePos();
  useCustomEffect(() => {
    if (!imageMask) return;

    const rect = imageMask.getBoundingClientRect();
    const relativeX = mousePos.x - rect.left;
    const relativeY = mousePos.y - rect.top;

    gsap.to(imageMask.firstElementChild, {
      duration: 0.2,
      clipPath: `circle(100px at ${relativeX}px ${relativeY}px)`,
    });
  }, [mousePos.x, mousePos.y, imageMask]);

  const ImageMaskMouseEnter = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    setImageMask(target);
  };

  // set text width for scramble animation
  const buttonTextRef = useRef<(HTMLParagraphElement | null)[]>([]);
  useCustomEffect(() => {
    if (!buttonTextRef.current) return;
    buttonTextRef.current.forEach((elem) => {
      if (!elem) return;
      const rect = elem.getBoundingClientRect();
      elem.style.setProperty("--width", `${rect.width + 3}px`);
    });
  }, []);

  // scramble text animation
  const scramText = (e: React.MouseEvent, text: string) => {
    let parent = e.target as HTMLButtonElement;
    let target = parent.firstElementChild as HTMLParagraphElement;
    scrambleText(target, text);
  };

  return (
    <div className="showcase-container">
      <div className="image-container" onMouseEnter={(e) => ImageMaskMouseEnter(e)}>
        <img src={image1} className="image-blur-mask" />
        <div className="content">
          <p>001</p>
          <h2>Freedom to redefine your presence.</h2>
          <ButtonSolidOverlay
            text="Shop Now"
            defaultColor={colors.offWhite}
            overlay={colors.offWhite}
            arrowIcon={true}
            fg={colors.black}
          />
        </div>
        <img src={image1} />
      </div>
      <div className="image-container" onMouseEnter={(e) => ImageMaskMouseEnter(e)}>
        <img src={image2} className="image-blur-mask" />
        <div className="content">
          <p>002</p>
          <h2>Freedom to redefine your presence.</h2>
          <ButtonSolidOverlay
            text="Shop Bestselling"
            defaultColor={colors.offWhite}
            overlay={colors.offWhite}
            arrowIcon={true}
            fg={colors.black}
          />
        </div>
        <img src={image2} />
      </div>
    </div>
  );
};

export default ShowcaseArea;
