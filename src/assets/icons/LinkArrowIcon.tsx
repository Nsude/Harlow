import React from "react";
import { IconProps } from "../../models";
import { useGlobalContext } from "../../components/contexts/GlobalContex";

const LinkArrowIcon: React.FC<IconProps> = ({ size, color }) => {
  const { colors } = useGlobalContext();
  return (
    <svg width={size || 20} height={size || 20} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 20L20 1M20 1H1M20 1V20" stroke={color || colors.black} strokeWidth="2" />
    </svg>
  );
};

export default LinkArrowIcon;
