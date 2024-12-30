import React from "react";
import { useGlobalContext } from "../../components/contexts/GlobalContex";
import { IconProps } from "../../models";

const LogoutIcon: React.FC<IconProps> = ({ color }) => {
  const { colors } = useGlobalContext();

  return (
    <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.4786 12.3667L19.2796 9.56565L16.4786 6.76456M8.0753 9.56565H19.2031M10.2636 18.2534C5.4274 18.2534 1.51025 14.9709 1.51025 9.5C1.51025 4.02913 5.4274 0.746605 10.2636 0.746605"
        stroke={color || colors.black}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LogoutIcon;
