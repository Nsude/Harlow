import React, { createRef, useEffect, useRef, useState } from "react";
import LinkArrowIcon from "../../assets/icons/LinkArrowIcon";
import { useGlobalContext } from "../contexts/GlobalContex";
import { gsap } from "gsap";
import useCustomEffect from "../../hooks/useCustomEffect";
import { useNavigate } from "react-router-dom";
import { useNavContext } from "../contexts/NavbarContext";

interface Props {
  name: string; // product-name
  title: string;
  currentMenu: string;
  closeDesktopMenu: () => void;
}

const DesktopMenuITem: React.FC<Props> = ({ name, title, currentMenu, closeDesktopMenu }) => {
  const { colors } = useGlobalContext();
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const { setMenuOpen } = useNavContext();

  /* Element Refs */
  const firstCopy = createRef<HTMLSpanElement>();
  const secondCopy = createRef<HTMLDivElement>();
  const iconCon = createRef<HTMLSpanElement>();

  const preventInitialRender = useRef(0);
  useEffect(() => {
    preventInitialRender.current += 1;
    if (preventInitialRender.current < 3) return;
    // animate second copy in
    if (animate) {
      gsap.to(firstCopy.current, {
        y: -35,
      });

      gsap.to(secondCopy.current, {
        top: "50%",
        transform: "translateY(-50%)",
      });

      gsap.fromTo(
        iconCon.current,
        { bottom: -25, position: "relative" },
        {
          bottom: 0,
          delay: 0.25,
        }
      );
    } else {
      // animate second copy out
      gsap.to(firstCopy.current, {
        y: 0,
      });

      gsap.to(secondCopy.current, {
        y: 25,
      });

      gsap.to(iconCon.current, {
        bottom: -25,
      });
    }
  }, [animate]);

  const handleClick = () => {
    closeDesktopMenu();
    navigate(`/view-products/${currentMenu}/${title}/${name}`);
  };

  return (
    <button
      onMouseEnter={() => setAnimate(true)}
      onMouseLeave={() => setAnimate(false)}
      onClick={handleClick}
      className="nav-listItem-container flex">
      <span ref={firstCopy}>{name}</span>
      <div ref={secondCopy} className="second-item-copy flex cg-5">
        <p>{name}</p>
        <span ref={iconCon}>
          <LinkArrowIcon color={colors.offWhite} size={12} />
        </span>
      </div>
    </button>
  );
};

export default DesktopMenuITem;
