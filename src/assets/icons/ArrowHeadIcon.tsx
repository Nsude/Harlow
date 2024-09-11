import React from "react";
import { IconProps } from "../../models";
import { useGlobalContext } from "../../components/contexts/GlobalContex";

const ArrowHeadIcon: React.FC<IconProps> = ({ color, size }) => {
  const { colors } = useGlobalContext();
  return (
    <svg
      width={size ? size / 1.83 : 12}
      height={size || 22}
      viewBox="0 0 12 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1L11 11L1 21" stroke={color || colors.black} strokeWidth="1.38889" />
    </svg>
  );
};

export default ArrowHeadIcon;
