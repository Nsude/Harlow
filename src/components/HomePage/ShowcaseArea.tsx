import { useRef, useState } from "react";
import placeHolder from "../../assets/media/images/placeholderImage.png";
import LinkArrowIcon from "../../assets/icons/LinkArrowIcon";
import { useGlobalContext } from "../contexts/GlobalContex";
import useCustomEffect from "../../hooks/useCustomEffect";

const ShowcaseArea = () => {
  const { colors } = useGlobalContext();
  const [arrowColor, setArrowColor] = useState(colors.black);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

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

  return (
    <div className="showcase-container">
      <div className="image-container">
        <div className="content">
          <p>001</p>
          <h2>Freedom to redefine your presence.</h2>
          <button ref={(e) => buttonsRef.current.push(e)} className="primary-btn">
            <p>Shop Bestselling</p>
            <LinkArrowIcon size={14} color={arrowColor} />
          </button>
        </div>
        <img src={placeHolder} />
      </div>
      <div className="image-container">
        <div className="content">
          <p>002</p>
          <h2>Freedom to redefine your presence.</h2>
          <button ref={(e) => buttonsRef.current.push(e)} className="primary-btn">
            <p>Shop Now</p>
            <LinkArrowIcon size={14} color={arrowColor} />
          </button>
        </div>
        <img src={placeHolder} />
      </div>
    </div>
  );
};

export default ShowcaseArea;
