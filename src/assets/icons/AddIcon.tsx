import React, { useRef } from "react";
import { IconProps } from "../../models";
import { useGlobalContext } from "../../components/contexts/GlobalContex";
import useCustomEffect from "../../hooks/useCustomEffect";
import { gsap } from "gsap";

const AddIcon: React.FC<IconProps> = ({ size, color, active }) => {
  const { colors } = useGlobalContext();
  const iconRef = useRef<SVGSVGElement | null>();

  useCustomEffect(() => {
    if (!iconRef.current) return;

    if (active) {
      gsap.to(iconRef.current, {
        rotate: "270deg"
      });

      gsap.to(iconRef.current.children[1], {
        rotate: "90deg",
        delay: 0.2,
        transformOrigin: "center"
      });
    } else {
      gsap.to(iconRef.current, {
        rotate: "0deg",
        delay: 0.2
      });

      gsap.to(iconRef.current.children[1], {
        rotate: "0deg",
        delay: 0.2
      });
    }
  }, [active]);

  return (
    <svg
      ref={(el) => (iconRef.current = el)}
      width={size || 20}
      height={size || 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 0V20" stroke={color || colors.black} strokeWidth="1.25" />
      <path d="M20 10L0 10" stroke={color || colors.black} strokeWidth="1.25" />
    </svg>
  );
};

export default AddIcon;
