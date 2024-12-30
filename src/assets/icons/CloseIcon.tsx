import React from "react";
import { IconProps } from "../../models";
import { useGlobalContext } from "../../components/contexts/GlobalContex";

const CloseIcon: React.FC<IconProps> = ({ color, size }) => {
  const { colors } = useGlobalContext();

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 1.99998L2 18M18 18L2 1.99998" stroke={color || colors.black} strokeWidth="1.5" />
    </svg>
  );
};

export default CloseIcon;
