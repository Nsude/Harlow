import React from "react";
import { IconProps } from "../../models";
import { useGlobalContext } from "../../components/contexts/GlobalContex";

const AddIcon: React.FC<IconProps> = ({ size, color }) => {
  const { colors } = useGlobalContext();
  return (
    <svg width={size || 20} height={size || 20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0V20" stroke={color || colors.black} strokeWidth="1.25" />
      <path d="M20 10L0 10" stroke={color || colors.black} strokeWidth="1.25" />
    </svg>
  );
};

export default AddIcon;
